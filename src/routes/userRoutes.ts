import { Router } from "express";
import {  UserController } from "../controller/userController";
import { UserDataService } from "../services/UserDataService";
import { UserRepository } from "../Repositories/userRepository";



const router: Router = Router();
const userRepository = new UserRepository()
const userDataService = new UserDataService(userRepository);
const userController = new UserController( userDataService ); 

router.post("/", userController.createUser.bind(UserController));
router.get("/", userController.getAllUsers.bind(UserController) );

export default router;