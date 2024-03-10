import express from "express";
import {
  activeUser,
  loginUser,
  logoutUser,
  registrationUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);

UserRouter.post("/activate-user", activeUser);

UserRouter.post("/login", loginUser);

UserRouter.get("/logout", isAuthenticated, logoutUser);

export default UserRouter;
