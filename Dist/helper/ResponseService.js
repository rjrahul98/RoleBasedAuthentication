"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseService = /** @class */ (function () {
    //method 
    function ResponseService(isValid, data, error) {
        this.isValid = isValid;
        this.data = data;
        this.error = error;
    }
    ResponseService.getValidResponse = function (data) {
        return new ResponseService(true, data, null);
    };
    ResponseService.getInvalidResponse = function (error) {
        return new ResponseService(false, null, error);
    };
    return ResponseService;
}());
exports.ResponseService = ResponseService;
