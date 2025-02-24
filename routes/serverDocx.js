"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverDocxRouter = void 0;
var express = require("express");
var encryptionAPI_js_1 = require("../source/encryptionAPI.js");
var serverDocxRouter = function (path, dirr) {
    var router = express.Router();
    router.get('/', function (req, res) {
        return (
        // res.type('.html')
        res.sendFile(path.resolve(dirr, 'client/index.html')));
    });
    router.get('/docx', function (req, res) {
        return (
        // res.type('.html')
        res.sendFile(path.resolve(dirr, 'client/docx.html')));
    });
    router.get('/service-api', function (req, res) {
        res.status(200);
        return res.json(encryptionAPI_js_1.keyObject);
    });
    return router;
};
exports.serverDocxRouter = serverDocxRouter;
