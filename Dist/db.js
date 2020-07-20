"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
require('dotenv').config();
var Database = /** @class */ (function () {
    function Database() {
        this.mongoUrl = "" + process.env.MONGO_URL;
    }
    Database.prototype.connectMongooseServer = function () {
        mongoose.connect(this.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(function () {
            console.log('mongo server connected');
        })
            .catch(function (error) {
            console.log(error);
            console.log('mongo server connection failed');
        });
    };
    return Database;
}());
exports.Database = Database;
