"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const fetch = require('node-fetch');
const InvestmentModel_1 = require("../models/InvestmentModel");
class InvestmentRoute {
    constructor() {
        this.investmentModel = InvestmentModel_1.default;
    }
    getRecommendations(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(
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
            });
            return res.json();
        });
    }
    /**
     * Create a new investment
     *
     * @param {Hapi.Request} request
     * @param {Hapi.ReplyNoContinue} reply
     * @returns {Promise<Hapi.ReplyValue>}
     * @memberof InvestmentRoute
     */
    create(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const investment = yield this.investmentModel.create({
                    refId: request.payload.refId,
                });
                return reply(investment);
            }
            catch (e) {
                console.log(`ERROR: `, e);
                return reply(e);
            }
        });
    }
    recommendations(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer_id } = request.params;
                // tslint:disable-next-line:radix
                const result = yield this.getRecommendations(parseInt(customer_id));
                const data = result.Results.output1[0];
                const ids = Object.keys(data)
                    .filter(key => key.indexOf('Item') !== -1)
                    .map(key => parseInt(data[key]));
                const investment = yield this.investmentModel
                    .find({
                    CD_FUNDO: { $in: ids },
                })
                    .limit(20);
                console.log('quantidade', investment.length);
                return reply({ investment });
            }
            catch (e) {
                console.log(`ERROR: `, e);
                return reply(e);
            }
        });
    }
    /**
     * @returns [Returns the Route object for HapiRouter to setup]
     * @memberOf HelloWorldRoute
     */
    createInvestment() {
        return {
            path: '/investment',
            method: 'POST',
            config: {
                description: 'Criar um investmento',
                notes: 'Retorna o investimento criado',
                tags: ['api', 'investment'],
                handler: (req, reply) => this.create(req, reply),
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
    }
    listInvestment() {
        return {
            path: '/investment/{customer_id}',
            method: 'GET',
            config: {
                description: 'Obter recomendação de investimento',
                notes: 'Obter recomendação de investimento',
                tags: ['api', 'investment'],
                handler: (req, reply) => this.recommendations(req, reply),
                validate: {
                    params: {
                        customer_id: joi.number().required(),
                    },
                },
            },
        };
    }
    routes() {
        return [this.createInvestment(), this.listInvestment()];
    }
}
exports.InvestmentRoute = InvestmentRoute;
//# sourceMappingURL=Investment.js.map