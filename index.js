"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var dataAccessLayer_js_1 = require("./source/dataAccessLayer.js");
var databaseController_js_1 = require("./source/databaseController.js");
var app = express();
var port = 34587;
app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
    // const locations = getLocations('./source/locations.json');
    // const locationsJson = JSON.parse(locations)
    return res.json(dataAccessLayer_js_1.locations);
});
app.get('/adverts', function (req, res) {
    res.send('Hello, TypeScript with Express!');
});
app.post('/adverts', function (req, res) {
    // const reqBody = JSON.parse(req.body)
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
app.get('/admin', function (req, res) {
    databaseController_js_1.baseController.GetLocations()
        .then(function (data) {
        res.status(200);
        return res.json(data);
    })
        .catch(function (err) { return console.log(err); });
});
app.post('/admin', function (req, res) {
    console.log(req.body);
    databaseController_js_1.baseController.addTown(req.body, function (error) {
        if (error) {
            return console.log(error);
        }
    });
    return res.json({
        status: 200,
        comment: "".concat(req.body, " was added to base")
    });
});
app.delete('/towns/:townId', function (req, res) {
    // res.status(200)
    console.log("Request DELETE --->");
    console.log(req.params);
    var townId = req.params.townId;
    databaseController_js_1.baseController.deleteTown(townId, function (error) {
        if (error) {
            return console.log(error);
        }
    });
    return res.json({
        status: 200,
        comment: "was deleted to base"
    });
});
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
