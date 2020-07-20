"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userRoutes_1 = require("./router/userRoutes");
function configRoutes(app) {
    app.use('/user', userRoutes_1.userRoutes);
}
exports.configRoutes = configRoutes;
