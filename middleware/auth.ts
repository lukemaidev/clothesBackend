import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies)
  const authHeader = JSON.parse(req.cookies.secureCookie);
  
  const token = authHeader && authHeader.AdminCookie;
  try {

    if (token == null) return res.sendStatus(401);
    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: any, user: any) => {
        req.body.decodedToken = user;
      }
    );
    next();
  } catch {
    (err: any) => {
      return res.sendStatus(403);
    };
  }
};

const roleAuth = (role: String) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.decodedToken) {
        return res.status(401).send("Unauthorized");
      }
      if (req.body.decodedToken.userType !== role) {
        return res.status(403).send("Unauthorized");
      }
    } catch (err:any) {
      return res.status(500).json({ error: err.message });
    }

    next();
  };
};
module.exports = { authenticateToken, roleAuth };
