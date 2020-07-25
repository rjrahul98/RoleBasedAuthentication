import { UserService } from '../services/userService'
import { Request, Response } from 'express'

export class UserController {
    public async registerUser(req: Request, res: Response) {
        let user = await UserService.registerUser(req, res);
        return res.json(user);
    };
    public async loginUser(req: Request, res: Response) {
        let loggedInUser = await UserService.loginUser(req, res);
        return res.json(loggedInUser);
    };
    public async getProfile(req: Request, res: Response) {
        let data = await UserService.getProfile(req, res);
        return res.json(data);
    };
    public async adminAndSupervisorProtected(req: Request, res: Response) {
        let data = await UserService.adminAndSupervisorProtected(req, res);
        return res.json(data);
    };
    public async adminProtected(req: Request, res: Response) {
        let data = await UserService.adminProtected(req, res);
        return res.json(data);
    };
}