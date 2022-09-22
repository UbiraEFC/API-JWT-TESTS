import { Router } from "express";
import { AuthenticateUserController } from "../../modules/users/services/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../modules/users/services/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post('/signup', createUserController.signUp);
userRoutes.post('/signin', authenticateUserController.singIn);

export { userRoutes }