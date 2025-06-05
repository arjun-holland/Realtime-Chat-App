import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){       //if decoded is null
            return res.status(401).json({message: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); //select everyting from user except password as we dont send the password back to the client
        if(!user){
            return res.status(401).json({message: "User Not Found"});
        }

        req.user = user; //as user is autenticated then add Database user to request object user for further modifications of user 
        next(); //call next function i.e Continue to route

    }catch(error){
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

