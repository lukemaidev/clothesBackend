const express = require("express")

const {getAllUsers, createUser, updateUser, deleteUser, getUserById, getUserByEmail} = require("../controllers/user.controller")
const {authenticateToken, roleAuth} = require("../middleware/auth")

const router = express.Router();

/*This is disabled for developing purposes

router.use(authenticateToken)
router.use(roleAuth("admin"))

*/


router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/",updateUser );
router.delete("/", deleteUser);
router.get("/id/:id", getUserById);
router.get("/email/:email", getUserByEmail);

module.exports = router;

export {};