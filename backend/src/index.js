//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import {app,server} from "./lib/socket.js"
//for deployment
import path from "path";  


dotenv.config();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser()); // 👈 MUST come before any route that uses req.cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // Allow requests only from this frontend.
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

}


const PORT = process.env.PORT
server.listen(PORT,()=>{
    console.log("server is running on PORT:" + PORT);
    connectDB();
});
