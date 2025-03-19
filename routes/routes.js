"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    app.get("/api/1.0/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userObjString, checkStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("/api/1.0/auth --> Authorization Request");
                    userObjString = req.header('User-Object');
                    // Декодирование из base64
                    userObjString = Buffer.from(userObjString, 'base64').toString();
                    return [4 /*yield*/, (0, authorizationController_js_1.checkAuthData)(JSON.parse(userObjString), req.session)];
                case 1:
                    checkStatus = _a.sent();
                    if (checkStatus.status) {
                        // По учетным данным найденно соответствие
                        // Далее нужно привязать UserID к сессии
                        res.status(200);
                        res.set({
                            'Cookie': '_session_key=' + req.session.session_key,
                            'expires': req.session.expiresDate,
                        });
                        return [2 /*return*/, res.json({
                                status: 200,
                                comment: "Authorization success",
                                UserID: checkStatus.UserID
                            })];
                    }
                    else {
                        res.status(401);
                        return [2 /*return*/, res.json({
                                status: 401,
                                comment: "Authorization error"
                            })];
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.addRoutes = addRoutes;
