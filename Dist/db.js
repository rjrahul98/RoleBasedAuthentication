"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Database = /** @class */ (function () {
    function Database() {
        this.mongoUrl = "mongodb+srv://rahul:Rahul123@cluster0.pqvke.mongodb.net/RoleBasedAuth?retryWrites=true&w=majority";
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
