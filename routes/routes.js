"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = void 0;
var databaseController_js_1 = require("../source/databaseController.js");
var validationController_js_1 = require("../source/validationController.js");
var authorizationController_js_1 = require("../source/authorizationController.js");
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
        databaseController_js_1.baseController.GetAllUsers()
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
        var userObj = req.header('User-Object');
        // Декодирование из base64
        userObj = Buffer.from(userObj, 'base64').toString();
        //------------------------
        console.log(JSON.parse(userObj));
        validationController_js_1.ValidationController.VerifyUniqueLogin(JSON.parse(userObj))
            .then(function (result) {
            console.log(result.message);
            if (result.status == 422) {
                return res.json({
                    status: result.status,
                    comment: result.message
                });
            }
            else {
                return databaseController_js_1.baseController.selectLastUser().then(function (lastUserId) {
                    return res.json({
                        status: result.status,
                        comment: result.message,
                        userId: lastUserId
                    });
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
    app.delete('/users/:userId', function (req, res) {
        // res.status(200)
        console.log("Request DELETE --->");
        console.log(req.params);
        var userId = req.params.userId;
        databaseController_js_1.baseController.deleteUser(userId, function (error) {
            if (error) {
                return console.log(error);
            }
        });
        return res.json({
            status: 200,
            comment: "was deleted to base"
        });
    });
    app.get("/api/1.0/auth", function (req, res) {
        console.log("/api/1.0/auth --> Authorization Request");
        var userObjString = req.header('User-Object');
        // Декодирование из base64
        userObjString = Buffer.from(userObjString, 'base64').toString();
        var check = (0, authorizationController_js_1.checkAuthData)(JSON.parse(userObjString), req.session);
        if (check) {
            res.status(200);
            return res.json({
                status: 200,
                comment: "\u043D\u0430\u0439\u0434\u0435\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C"
            });
        }
        else {
            res.status(401);
            return res.json({
                status: 401,
                comment: "\u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0439"
            });
        }
    });
};
exports.addRoutes = addRoutes;
