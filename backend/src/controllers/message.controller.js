import User from "../models/user.model.js"
import Message from "../models/message.model.js";
import cloudinary from "cloudinary";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch(error){
        console.error("Error in getUsersForSidebar:",error.message);
        res.status(500).json({message: "Internal server error"});        
    }
};

export const getMessages = async (req,res) => {
    try{
        const {id:userToChartId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChartId}, //iam sender
                {senderId:userToChartId,receiverId:myId}  //iam receiver         
            ]
        })
        res.status(200).json(messages);
    }catch(error){
        console.error("Error in getMessages controller:",error.message);
        res.status(500).json({message: "Internal server error"});          
    }
};


export const sendMessage  = async (req,res) => {
    try{
        const {text,image} = req.body;
        const {id: receiverId} = req.params; //gettinig the id and rename it to the receiverId
        const senderId = req.user._id;  //myid

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();  //to save a new document (in this case, a newMessage) to the MongoDB database.

        //todo:realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage); // new message created
    }catch(error){
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}