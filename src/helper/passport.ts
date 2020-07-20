import { DbModel } from '../models/userSchema'
const { Strategy, ExtractJwt } = require('passport-jwt')
require('dotenv').config()

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.SECRET_KEY}`
}


module.exports = (passport: any) => {
    passport.use(new Strategy(opts, async (payload: any, done: any) => {
        await DbModel.UserModel.findById(payload.user_id).then(async (user: any) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }).catch((err: any) => {
            return done(null, false);
        })
    }))
}
