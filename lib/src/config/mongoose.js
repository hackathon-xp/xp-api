"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoConfig_1 = require("./mongoConfig");
mongoose.connect(mongoConfig_1.default.connection);
exports.default = mongoose;
//# sourceMappingURL=mongoose.js.map