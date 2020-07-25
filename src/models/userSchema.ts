const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName: {
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
        required: true,
        unique: [true, 'Mobile no. already registered']
    },
    role: {
        type: String,
        required: true,
        enum: ["technician", "supervisor", "admin"],
        default: "technician"
    }
});

export class DbModel {
    public static UserModel = mongoose.model('users', UserSchema);
}