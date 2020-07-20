"use strict";
var passport = require('passport');
var userAuth = passport.authenticate('jwt', { session: false });
var checkRole = function (roles) { return function (req, res, next) {
    if (roles.includes(req.user.role)) {
        next();
    }
    return res.status(401).json({
        message: 'Unauthorized',
        success: false
    });
}; };
module.exports = {
    userAuth: userAuth,
    checkRole: checkRole
};
