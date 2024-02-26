import { Request, Response } from "express";

const express = require("express")
const {authenticateToken, roleAuth} = require("../middleware/auth")

const router = express.Router();

/* A bunch of routes here*/
router.get("/", (req:Request,res:Response)=>{ res.status(200).json({alive: "True"})});
router.use(authenticateToken)
router.get("/admin",roleAuth("admin"), (req:Request,res:Response)=>{ res.status(200).json({alive: "True"})})
router.get("/user", roleAuth("user"))

module.exports = router;