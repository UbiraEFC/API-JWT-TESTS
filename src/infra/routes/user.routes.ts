import { Router } from "express";
import { AuthenticateUserController } from "../../modules/users/services/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../modules/users/services/createUser/CreateUserController";
import { SearchUserController } from "../../modules/users/services/searchUser/SearchUserCotroller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const searchUserController = new SearchUserController();

userRoutes.post('/signup', createUserController.signUp);
userRoutes.post('/signin', authenticateUserController.singIn);
userRoutes.get('/search', ensureAuthenticated, searchUserController.searchUser);

export { userRoutes }