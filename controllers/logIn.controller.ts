import { Request, Response } from "express";


const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const logIn = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ username: req.body.username });
    if (req.body.password !== users[0].password) {
      res.status(401).json({ error: "Invalid password" });
    } else {
      const token = jwt.sign(
        { userName: users[0].username, userType: users[0].userType, id:users[0]._id },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );
      res.cookie("secureCookie", JSON.stringify({AdminCookie:token}), {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true, 
        //For testing purpose this is set to false
      });
      res.status(200).json({ message:"Logged in successfully"})
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { logIn };
