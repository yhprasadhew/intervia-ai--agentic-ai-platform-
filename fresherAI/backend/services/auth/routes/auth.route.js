import express from "express";
import { GoogleAuth, Logout, GetMe } from "../controllers/auth.controller.js";
import authMiddleware from "../../../shared/middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", GoogleAuth);
authRouter.get("/me", authMiddleware, GetMe);
authRouter.get("/logout", Logout);
authRouter.post("/logout", Logout);

export default authRouter;

