"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var routes_1 = require("./routes/routes");
var serverDocx_1 = require("./routes/serverDocx");
var advertsRouter_1 = require("./routes/advertsRouter");
var sessionMiddleware_js_1 = require("./session/sessionMiddleware.js");
exports.app = express();
var corsOptions = {
    exposedHeaders: ['Authorization', 'Cookie'],
};
exports.app.use(bodyParser.json());
exports.app.use(cors(corsOptions));
exports.app.use(express.static('client'));
// app.use(cookieMiddleware)
exports.app.use(sessionMiddleware_js_1.sessionMiddleware);
exports.app.use("/", (0, serverDocx_1.serverDocxRouter)(path, __dirname));
exports.app.use("/adverts", (0, advertsRouter_1.advertsRouter)());
(0, routes_1.addRoutes)(exports.app, path, __dirname);
