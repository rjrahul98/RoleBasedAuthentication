import { UserController } from '../controller/userController'
const { userAuth, checkRole } = require('../helper/auth')
import { Router } from 'express'

export const userRoutes: Router = Router();

const userController = new UserController();

userRoutes.post('/register-technician', userController.registerTechnician);
userRoutes.post('/register-supervisor', userController.registerSupervisor);
userRoutes.post('/register-admin', userController.registerAdmin);
userRoutes.post('/login-technician', userController.loginTechnician);
userRoutes.post('/login-supervisor', userController.loginSupervisor);
userRoutes.post('/login-admin', userController.loginAdmin);
userRoutes.get('/profile', userAuth, userController.getProfile);
userRoutes.get('/admin-supervisor-protected', userAuth, checkRole(["admin", "supervisor"]), userController.adminAndSupervisorProtected);
userRoutes.get('/admin-Protected', userAuth, checkRole(["admin"]), userController.adminProtected);