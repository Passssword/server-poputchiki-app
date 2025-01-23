"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = void 0;
var databaseController_js_1 = require("../source/databaseController.js");
var validationController_js_1 = require("../source/validationController.js");
var addRoutes = function (app, path, dirr) {
    app.get('/admin', function (req, res) {
        databaseController_js_1.baseController.GetLocations()
            .then(function (data) {
            res.status(200);
            return res.json(data);
        })
            .catch(function (err) { return console.log(err); });
    });
    app.get('/admin/getUsers', function (req, res) {
        databaseController_js_1.baseController.GetUsers()
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
    app.post('/admin/addUser', function (req, res) {
        console.log("Request /admin/addUser POST --->");
        console.log(req.body);
        validationController_js_1.ValidationController.VerifyUniqueLogin(req.body)
            .then(function (result) {
            console.log(result.message);
            if (result.status == 422) {
                return res.json({
                    status: result.status,
                    comment: "".concat(result.message)
                });
            }
            else {
                return res.json({
                    status: result.status,
                    comment: "".concat(result.message)
                });
            }
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
