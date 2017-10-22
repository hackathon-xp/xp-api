"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var hapi = require("hapi");
// import Inert from 'inert'; // Usado para exposição de arquivos estáticos.
var vision = require('vision'); // Usado para administração de template engines
var inert = require('inert'); // Usado para administração de template engines
var hapiJwt = require('hapi-auth-jwt2');
var hapiSwagger = require('hapi-swagger');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Routes import
var HelloWolrdRoute_1 = require("./src/routes/HelloWolrdRoute");
var Investment_1 = require("./src/routes/Investment");
function startApi() {
    return __awaiter(this, void 0, void 0, function () {
        var server, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    server = new hapi.Server();
                    return [4 /*yield*/, server.connection({ port: process.env.APP_PORT || 3000 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, server.register([
                            inert,
                            vision,
                            {
                                register: hapiSwagger,
                                options: { info: { title: 'Minha API', version: '1.0' } },
                            },
                        ])];
                case 2:
                    _a.sent();
                    // System routes
                    return [4 /*yield*/, server.route(new HelloWolrdRoute_1.HelloWorldRoute().routes())];
                case 3:
                    // System routes
                    _a.sent();
                    return [4 /*yield*/, server.route(new Investment_1.InvestmentRoute().routes())];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, server.start()];
                case 5:
                    _a.sent();
                    console.info("SERVER RUNNING: " + (server.info || { uri: '' }).uri);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Falha na inicializa\u00E7\u00E3o da API: " + error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Bootstrap da API
exports.default = startApi();
//# sourceMappingURL=app.js.map