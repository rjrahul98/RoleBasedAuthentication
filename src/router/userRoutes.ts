import { UserController } from '../controller/userController'
const { userAuth, checkRole } = require('../helper/auth')
import { Router } from 'express'

export const userRoutes: Router = Router();

const userController = new UserController();

userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.get('/profile', userAuth, userController.getProfile);
userRoutes.get('/admin-supervisor-protected', userAuth, checkRole(["admin", "supervisor"]), userController.adminAndSupervisorProtected);
userRoutes.get('/admin-Protected', userAuth, checkRole(["admin"]), userController.adminProtected);