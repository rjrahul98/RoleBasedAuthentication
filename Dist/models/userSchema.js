"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'email already registered']
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["technician", "supervisor", "admin"],
        default: "technician"
    }
});
var DbModel = /** @class */ (function () {
    function DbModel() {
    }
    DbModel.UserModel = mongoose.model('users', UserSchema);
    return DbModel;
}());
exports.DbModel = DbModel;
