import express  from "express";
import { activeUser, loginUser, logoutUser, registrationUser } from "../controllers/user.controller";
const UserRouter = express.Router();

UserRouter.post('/registration', registrationUser);

UserRouter.post('/activate-user', activeUser);

UserRouter.post('/login', loginUser);

UserRouter.get('/logout', logoutUser);

export default UserRouter;