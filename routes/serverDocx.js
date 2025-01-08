"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverDocxRouter = void 0;
var express = require("express");
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
    return router;
};
exports.serverDocxRouter = serverDocxRouter;
