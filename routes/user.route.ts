import express  from "express";
import { activeUser, loginUser, registrationUser } from "../controllers/user.controller";
const UserRouter = express.Router();

UserRouter.post('/registration', registrationUser);

UserRouter.post('/activate-user', activeUser);

UserRouter.post('/login', loginUser);

export default UserRouter;