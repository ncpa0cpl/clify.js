"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineOption = exports.configure = exports.Clify = void 0;
var clify_1 = require("./clify");
Object.defineProperty(exports, "Clify", { enumerable: true, get: function () { return clify_1.Clify; } });
var configure_1 = require("./configure");
Object.defineProperty(exports, "configure", { enumerable: true, get: function () { return configure_1.configure; } });
var option_1 = require("./options/option");
Object.defineProperty(exports, "defineOption", { enumerable: true, get: function () { return option_1.defineOption; } });
