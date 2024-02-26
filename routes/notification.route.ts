const express = require("express")

const {getAllNotifications, createNotification, updateNotification, deleteNotification, getNotificationById, readNotification, unreadNotification} = require("../controllers/notification.controller")
const {authenticateToken, roleAuth} = require("../middleware/auth")

const router = express.Router();

/* A bunch of routes here*/

router.use(authenticateToken)
router.use(roleAuth("admin"))


router.get("/", getAllNotifications);
router.post("/", createNotification);
router.patch("/",updateNotification );
router.delete("/", deleteNotification);
router.get("/:id", getNotificationById);
router.patch("/read/user/:id", readNotification);
router.patch("/unread/user/:id", unreadNotification);

module.exports = router;

export {};