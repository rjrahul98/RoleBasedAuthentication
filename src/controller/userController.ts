import { UserService } from '../services/userService'
import { Request, Response } from 'express'

export class UserController {
    public async registerTechnician(req: Request, res: Response) {
        let user = await UserService.registerUser(req, 'technician', res);
        return res.json(user);
    };
    public async registerSupervisor(req: Request, res: Response) {
        let user = await UserService.registerUser(req, 'supervisor', res);
        return res.json(user);
    };
    public async registerAdmin(req: Request, res: Response) {
        let user = await UserService.registerUser(req, 'admin', res);
        return res.json(user);
    };
    public async loginTechnician(req: Request, res: Response) {
        let loggedInUser = await UserService.loginUser(req, 'technician', res);
        return res.json(loggedInUser);
    }
    public async loginSupervisor(req: Request, res: Response) {
        let loggedInUser = await UserService.loginUser(req, 'supervisor', res);
        return res.json(loggedInUser);
    }
    public async loginAdmin(req: Request, res: Response) {
        let loggedInUser = await UserService.loginUser(req, 'admin', res);
        return res.json(loggedInUser);
    }
    public async getProfile(req: Request, res: Response) {
        let data = await UserService.getProfile(req, res);
        return res.json(data);
    }
    public async adminAndSupervisorProtected(req: Request, res: Response) {
        let data = await UserService.adminAndSupervisorProtected(req, res);
        return res.json(data);
    }
    public async adminProtected(req: Request, res: Response) {
        let data = await UserService.adminProtected(req, res);
        return res.json(data);
    }
}