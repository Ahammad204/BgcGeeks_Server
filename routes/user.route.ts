import express from "express";
import {
  activeUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
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

UserRouter.get(
  "/get-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

UserRouter.put(
  "/update-user",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
UserRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default UserRouter;
