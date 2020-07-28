import { DbModel } from '../models/userSchema'
const jwt = require('jsonwebtoken')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
require('dotenv').config()

export class UserService {
    public static async registerUser(req: any, res: any) {
        try {
            let user = DbModel.UserModel(req.body);
            const salt = genSaltSync(10);
            user.password = hashSync(user.password, salt);
            await user.save();
            return res.status(200).json({
                message: 'user registered successfully please login',
                success: true
            });
        }
        catch (err) {
            return res.status(400).json({
                message: 'something went wrong',
                data: err,
                success: false
            });
        }
    }

    public static async loginUser(req: any, res: any) {
        try {
            let user = await DbModel.UserModel.findOne({ 'email': req.body.email }).exec();
            if (user) {
                let isValidUser = await compareSync(req.body.password, user.password);
                if (isValidUser) {
                    let token = await jwt.sign({ 'user_id': user._id, 'email': user.email, 'role': user.role }, `${process.env.SECRET_KEY}`, { expiresIn: "3 days" });
                    return res.status(200).json({
                        'name': user.name,
                        'role': user.role,
                        'token': `Bearer ${token}`,
                        'expiresIn': 72
                    });
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
            return res.json({
                message: "working for all the users",
                success: true
            });
        }
        catch (err) {
            return res.status(400).send(err);
        }
    }

    public static adminAndSupervisorProtected(req: any, res: any) {
        try {
            return res.status(200).json({
                message: "Admin and Supervisor users can Access this",
                success: true
            });
        }
        catch (err) {
            return res.status(400).send(err);
        }
    }

    public static adminProtected(req: any, res: any) {
        try {
            return res.status(200).json({
                message: "This is admin user's profile",
                success: true
            });
        }
        catch (err) {
            return res.status(400).send(err);
        }
    }

}