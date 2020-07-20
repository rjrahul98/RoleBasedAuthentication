const passport = require('passport')

const userAuth = passport.authenticate('jwt', { session: false });

const checkRole = (roles: any) => (req: any, res: any, next: any) => {
    if (roles.includes(req.user.role)) {
        next();
    }
    return res.status(401).json({
        message: 'Unauthorized',
        success: false
    })
}

module.exports = {
    userAuth,
    checkRole
}