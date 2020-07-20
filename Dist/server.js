"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var db_1 = require("./db");
var routes_1 = require("./routes");
var passport = require('passport');
exports.app = express();
var dbClient = new db_1.Database();
dbClient.connectMongooseServer();
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(passport.initialize());
require('./helper/passport')(passport);
routes_1.configRoutes(exports.app);
var port = 3000;
exports.app.listen(port, function () {
    console.log("server is running on port " + port);
});
