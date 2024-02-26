import { Request, Response } from "express";

const Clothes = require("../models/clothes.model");

const getAllClothes = async (req: Request, res: Response) => {
  try {
    const allClothess = await Clothes.find({});
    res.status(200).json({ allClothess });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getClothesById = async (req: Request, res: Response) => {
  try {
    const clothes = await Clothes.findById(req.params.id);
    res.status(200).json({ clothes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getClothesByUserId = async (req:Request, res:Response) => {
  try {
    const clothes = await Clothes.findOne({"ownerId": req.params.id});
    res.status(200).json({ clothes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


const createClothes = async (req: Request, res: Response) => {
  try {
    const clothes = new Clothes(req.body);
    await clothes.save();
    res.status(201).json({ clothes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateClothes = async (req: Request, res: Response) => {
  try {
    const updatedClothes = await Clothes.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedClothes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClothes = async (req: Request, res: Response) => {
  try {
    const deletedClothes = await Clothes.findByIdAndDelete(req.body.id);
    res.status(200).json({ deletedClothes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClothes,
  getClothesById,
  getClothesByUserId,
  createClothes,
  updateClothes,
  deleteClothes,
};
