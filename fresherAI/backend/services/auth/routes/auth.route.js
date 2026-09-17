import express from "express";
import { GoogleAuth, Logout, GetMe } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", GoogleAuth);
authRouter.get("/logout", Logout);
authRouter.get("/me", GetMe);

export default authRouter;
