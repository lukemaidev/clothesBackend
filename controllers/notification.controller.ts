import { Request, Response } from "express";

const Notification = require("../models/notification.model");

const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const allNotifications = await Notification.find({});
    res.status(200).json({ allNotifications });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getNotificationById = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id);
    res.status(200).json({ notification });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const createNotification = async (req: Request, res: Response) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({ notification });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getNotificationByUserId = async (req:Request, res:Response) => {
  try {
    const notification = await Notification.findOne({"ownerId": req.params.id});
    res.status(200).json({ notification });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

const updateNotification = async (req: Request, res: Response) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedNotification });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNotification = async (req: Request, res: Response) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.body.id);
    res.status(200).json({ deletedNotification });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const readNotification = async (req: Request, res: Response) => {
  try{
    const readNotification = await Notification.updateMany({ownerId: req.params.id}, {read: true});
    res.status(200).json({readNotification});
  }catch(error: any){
    res.status(500).json({error: error.message})
  }
}

//This controller is only used for testing purposes
const unreadNotification = async (req: Request, res: Response) => {
  try{
    const unreadNotification = await Notification.updateMany({ownerId: req.params.id}, {read: false});
    res.status(200).json({unreadNotification});
  }catch(error: any){
    res.status(500).json({error: error.message})
  }
}


module.exports = {
  getAllNotifications,
  getNotificationById,
  getNotificationByUserId,
  createNotification,
  updateNotification,
  deleteNotification,
  readNotification,
  unreadNotification
};
