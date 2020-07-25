"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var userSchema_1 = require("../models/userSchema");
var jwt = require('jsonwebtoken');
var _a = require('bcrypt'), genSaltSync = _a.genSaltSync, hashSync = _a.hashSync, compareSync = _a.compareSync;
require('dotenv').config();
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.registerUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, salt, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = userSchema_1.DbModel.UserModel(req.body);
                        salt = genSaltSync(10);
                        user.password = hashSync(user.password, salt);
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: 'user registered successfully please login',
                                success: true
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                message: 'user already exists',
                                success: false
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValidUser, token, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, userSchema_1.DbModel.UserModel.findOne({ 'email': req.body.email }).exec()];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, compareSync(req.body.password, user.password)];
                    case 2:
                        isValidUser = _a.sent();
                        if (!isValidUser) return [3 /*break*/, 4];
                        return [4 /*yield*/, jwt.sign({ 'user_id': user._id, 'email': user.email, 'role': user.role }, "" + process.env.SECRET_KEY, { expiresIn: "3 days" })];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                'role': user.role,
                                'token': "Bearer " + token,
                                'expiresIn': 72
                            })];
                    case 4: return [2 /*return*/, res.status(403).json({
                            message: 'incorrect email or password',
                            success: false
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, res.status(404).json({
                            message: 'user not found',
                            success: false
                        })];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                message: err_2,
                                success: false
                            })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserService.getProfile = function (req, res) {
        try {
            return res.json({
                message: "working for all the users",
                success: true
            });
        }
        catch (err) {
            return res.status(400).send(err);
        }
    };
    UserService.adminAndSupervisorProtected = function (req, res) {
        try {
            return res.status(200).json({
                message: "Admin and Supervisor users can Access this",
                success: true
            });
        }
        catch (err) {
            return res.status(400).send(err);
        }
    };
    UserService.adminProtected = function (req, res) {
        try {
            return res.status(200).json({
                message: "This is admin user's profile",
                success: true
            });
        }
        catch (err) {
            return res.status(400).send(err);
        }
    };
    return UserService;
}());
exports.UserService = UserService;
