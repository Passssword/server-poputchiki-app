"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertsRouter = void 0;
var express = require("express");
var databaseController_js_1 = require("../source/databaseController.js");
var advertsRouter = function () {
    var router = express.Router();
    router.get('/', function (req, res) {
        databaseController_js_1.baseController.GetAllAdverts()
            .then(function (data) {
            res.status(200);
            return res.json(data);
        })
            .catch(function (err) { return console.log(err); });
    });
    router.get('/:advertID', function (req, res) {
        var advertID = req.params.advertID;
        console.log("advertID ---> " + advertID);
        databaseController_js_1.baseController.GetAdvert(advertID).then(function (data) {
            res.status(200);
            return res.json({ status: 200, data: data });
        }).catch(function (err) { return console.log(err); });
    });
    router.post('/', function (req, res) {
        // const reqBody = JSON.parse(req.body)
        console.log("Request POST --->");
        console.log(req.body);
        databaseController_js_1.baseController.create(req.body, function (error) {
            if (error) {
                return console.log(error);
            }
        });
        return res.json({
            status: 200,
            comment: "data is sending"
        });
    });
    return router;
};
exports.advertsRouter = advertsRouter;
