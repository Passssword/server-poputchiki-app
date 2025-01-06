"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = void 0;
var databaseController_js_1 = require("../source/databaseController.js");
var addRoutes = function (app, path, dirr) {
    app.get('/', function (req, res) {
        return (
        // res.type('.html')
        res.sendFile(path.resolve(dirr, 'client/index.html')));
    });
    app.get('/docx', function (req, res) {
        return (
        // res.type('.html')
        res.sendFile(path.resolve(dirr, 'client/docx.html')));
    });
    app.get('/adverts', function (req, res) {
        databaseController_js_1.baseController.GetAdverts()
            .then(function (data) {
            res.status(200);
            return res.json(data);
        })
            .catch(function (err) { return console.log(err); });
    });
    app.post('/adverts', function (req, res) {
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
};
exports.addRoutes = addRoutes;
