import express from "express";
import {
  activeUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);

UserRouter.post("/activate-user", activeUser);

UserRouter.post("/login", loginUser);

UserRouter.get("/logout", isAuthenticated, logoutUser);

UserRouter.get("/refresh", updateAccessToken);

UserRouter.get("/me", isAuthenticated, getUserInfo);

UserRouter.post("/social-auth", socialAuth);

UserRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

UserRouter.put("/update-user-password", isAuthenticated, updatePassword);

UserRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

export default UserRouter;
