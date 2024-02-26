import { Response, Request } from "express";

const express = require("express");

const UserRoutes = require("./routes/user.route");
const LoginRoutes = require("./routes/logIn.routes")
const AuthRoutes = require("./routes/auth.routes")
const ClothesRoutes = require("./routes/clothes.route")
const NotificationRoutes = require("./routes/notification.route")


const cookieParser = require('cookie-parser');

const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());

/* A middleware that parses the cookie of the request and makes it available in the req.cookies object. */
app.use(cookieParser())

/* This is the root route. It is used to check if the server is running. */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ alive: "True" });
});

/* Telling the server to use the routes in the ProductRoutes file. */
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/login", LoginRoutes )
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/clothes", ClothesRoutes)
app.use("/api/v1/notifications", NotificationRoutes)

module.exports = app;