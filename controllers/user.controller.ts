import { Request, Response } from "express";

const User = require("../models/user.model");

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ allUsers });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByUserName = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.body.id);
    res.status(200).json({ deletedUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUserName,
  createUser,
  updateUser,
  deleteUser,
};
