const express = require("express")

const {logIn} = require("../controllers/logIn.controller")

const router = express.Router();

/* A bunch of routes here*/
router.post("/", logIn);


module.exports = router;

export {};