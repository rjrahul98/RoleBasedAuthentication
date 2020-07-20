import { DbModel } from '../models/userSchema'
const jwt = require('jsonwebtoken')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')

export class UserService {
    public static async registerUser(req: any, role: string, res: any) {
        try {
            let user = DbModel.UserModel(req.body);
            const salt = genSaltSync(10);
            user.password = hashSync(user.password, salt);
            user.role = role;
            await user.save();
            return res.status(200).json({
                message: 'user registered successfully please login',
                success: true
            });
        }
        catch (err) {
            return res.status(400).json({
                message: 'user already exists',
                success: false
            });
        }
    }

    public static async loginUser(req: any, role: string, res: any) {
        try {
            let user = await DbModel.UserModel.findOne({ 'email': req.body.email }).exec();
            if (user) {
                let isValidUser = await compareSync(req.body.password, user.password);
                if (isValidUser) {
                    if (user.role !== role) {
                        return res.status(401).json({
                            message: 'Unauthorized login credentials',
                            success: false
                        });
                    }
                    else {
                        let token = await jwt.sign({ 'user_id': user._id, 'email': user.email, 'role': role }, 'SECRET_KEY', { expiresIn: "3 days" });
                        return res.status(200).json({
                            'token': `Bearer ${token}`,
                            'expiresIn': 72
                        });
                    }
                }
                else {
                    return res.status(403).json({
                        message: 'incorrect email or password',
                        success: false
                    });
                }
            } else {
                return res.status(404).json({
                    message: 'user not found',
                    success: false
                });
            }
        }
        catch (err) {
            return res.status(400).json({
                message: err,
                success: false
            });
        }
    }

    public static getProfile(req: any, res: any) {
        try {
            return res.json('working for all the users');
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }

    public static adminAndSupervisorProtected(req: any, res: any) {
        try {
            return res.status(200).json('Admin and Supervisor users can Access this');
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }

    public static adminProtected(req: any, res: any) {
        try {
            return res.status(200).json('Only admin users can access this');
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }

}