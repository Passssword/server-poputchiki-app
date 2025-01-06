"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = 34587;
app_1.app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
