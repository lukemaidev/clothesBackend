const express = require("express")

const {authenticateToken, roleAuth} = require("../middleware/auth")
const {getAllClothes, getClothesById, updateClothes, deleteClothes, createClothes, getClothesByUserId  } = require("../controllers/clothes.controller")

const router = express.Router();
/*This is disabled for developing purposes

router.use(authenticateToken)
router.use(roleAuth("admin"))

*/


router.get("/", getAllClothes);
router.get("/:id", getClothesById);
router.get("/user/:id", getClothesByUserId)
router.patch("/", updateClothes);
router.delete("/", deleteClothes);
router.post("/", createClothes);

module.exports = router;

export {};