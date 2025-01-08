"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = void 0;
var databaseController_js_1 = require("../source/databaseController.js");
var addRoutes = function (app, path, dirr) {
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
