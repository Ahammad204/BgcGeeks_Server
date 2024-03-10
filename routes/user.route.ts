import express  from "express";
import { activeUser, registrationUser } from "../controllers/user.controller";
const UserRouter = express.Router();

UserRouter.post('/registration', registrationUser);

UserRouter.post('/activate-user', activeUser);

export default UserRouter;