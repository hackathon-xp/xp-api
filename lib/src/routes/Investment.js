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
var joi = require("joi");
var fetch = require('node-fetch');
var InvestmentModel_1 = require("../models/InvestmentModel");
var InvestmentRoute = /** @class */ (function () {
    function InvestmentRoute() {
        this.investmentModel = InvestmentModel_1.default;
    }
    InvestmentRoute.prototype.getRecommendations = function (customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(
                        // tslint:disable-next-line:max-line-length
                        'https://ussouthcentral.services.azureml.net/workspaces/e71bfeab7ae04db087ab9a0b7b8857b1/services/07f1ee3004724314a54d476697b99ef7/execute?api-version=2.0&format=swagger', {
                            method: 'POST',
                            body: JSON.stringify({
                                Inputs: {
                                    input1: [
                                        {
                                            CD_CLIENTE: customerId,
                                            CD_FUNDO: 1,
                                            ranking: 1,
                                        },
                                    ],
                                },
                                GlobalParameters: {},
                            }),
                            headers: {
                                Authorization: 
                                // tslint:disable-next-line:max-line-length
                                'Bearer DFPefz+jyiWCZ+4TSuy9slyMoAfkHTeBS5/6/sD5EeBPGZtEv7zYGlTDqMd1UeHB8jiHTCULd/+/QO6chKVHMg==',
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.json()];
                }
            });
        });
    };
    /**
     * Create a new investment
     *
     * @param {Hapi.Request} request
     * @param {Hapi.ReplyNoContinue} reply
     * @returns {Promise<Hapi.ReplyValue>}
     * @memberof InvestmentRoute
     */
    InvestmentRoute.prototype.create = function (request, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var investment, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.investmentModel.create({
                                refId: request.payload.refId,
                            })];
                    case 1:
                        investment = _a.sent();
                        return [2 /*return*/, reply(investment)];
                    case 2:
                        e_1 = _a.sent();
                        console.log("ERROR: ", e_1);
                        return [2 /*return*/, reply(e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvestmentRoute.prototype.recommendations = function (request, reply) {
        return __awaiter(this, void 0, void 0, function () {
            var customer_id, result, data_1, ids, investment, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        customer_id = request.params.customer_id;
                        return [4 /*yield*/, this.getRecommendations(parseInt(customer_id))];
                    case 1:
                        result = _a.sent();
                        data_1 = result.Results.output1[0];
                        ids = Object.keys(data_1)
                            .filter(function (key) { return key.indexOf('Item') !== -1; })
                            .map(function (key) { return parseInt(data_1[key]); });
                        return [4 /*yield*/, this.investmentModel
                                .find({
                                CD_FUNDO: { $in: ids },
                            })
                                .limit(20)];
                    case 2:
                        investment = _a.sent();
                        console.log('quantidade', investment.length);
                        return [2 /*return*/, reply({ investment: investment })];
                    case 3:
                        e_2 = _a.sent();
                        console.log("ERROR: ", e_2);
                        return [2 /*return*/, reply(e_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @returns [Returns the Route object for HapiRouter to setup]
     * @memberOf HelloWorldRoute
     */
    InvestmentRoute.prototype.createInvestment = function () {
        var _this = this;
        return {
            path: '/investment',
            method: 'POST',
            config: {
                description: 'Criar um investmento',
                notes: 'Retorna o investimento criado',
                tags: ['api', 'investment'],
                handler: function (req, reply) { return _this.create(req, reply); },
                validate: {
                    payload: {
                        refId: joi
                            .string()
                            .min(1)
                            .required(),
                    },
                },
            },
        };
    };
    InvestmentRoute.prototype.listInvestment = function () {
        var _this = this;
        return {
            path: '/investment/{customer_id}',
            method: 'GET',
            config: {
                description: 'Obter recomendação de investimento',
                notes: 'Obter recomendação de investimento',
                tags: ['api', 'investment'],
                handler: function (req, reply) { return _this.recommendations(req, reply); },
                validate: {
                    params: {
                        customer_id: joi.number().required(),
                    },
                },
            },
        };
    };
    InvestmentRoute.prototype.routes = function () {
        return [this.createInvestment(), this.listInvestment()];
    };
    return InvestmentRoute;
}());
exports.InvestmentRoute = InvestmentRoute;
//# sourceMappingURL=Investment.js.map