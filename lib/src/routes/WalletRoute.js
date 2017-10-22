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
const WalletModel_1 = require("./../models/WalletModel");
class WalletRoute {
    constructor() {
        this.walletModel = WalletModel_1.default;
    }
    wallet(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.walletModel.find({}).lean(true);
                return reply(user);
            }
            catch (e) {
                console.log(`ERRO`, e);
                return reply(e);
            }
        });
    }
    balanceWallet(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payload } = request;
                const user = yield this.walletModel.update({ '_id': payload.old_id }, {
                    $set: {
                        'status': 'inactive'
                    }
                });
                var newWallet = yield this.walletModel.create({
                    userId: user.userId,
                    investments: payload.investments_id
                });
                reply(newWallet);
            }
            catch (e) {
                console.log(`ERRO`, e);
                return reply(e);
            }
        });
    }
    createWalletFn(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payload } = request;
                const user = yield this.walletModel.create(payload);
                return reply(user);
            }
            catch (e) {
                console.log(`ERRO`, e);
                return reply(e);
            }
        });
    }
    /**
     * @returns [Returns the Route object for HapiRouter to setup]
     * @memberOf HelloWorldRoute
     */
    createWallet() {
        return {
            path: '/wallet',
            method: 'POST',
            config: {
                validate: {
                    payload: {
                        userId: joi.string().required(),
                        investments: joi.array(),
                    },
                },
                description: 'Cria uma carteira',
                notes: 'Cria uma carteira',
                tags: ['api'],
                handler: (req, reply) => this.createWalletFn(req, reply),
            },
        };
    }
    /**
     * @returns [Returns the Route object for HapiRouter to setup]
     * @memberOf HelloWorldRoute
     */
    getWallet() {
        return {
            path: '/wallet',
            method: 'GET',
            config: {
                description: 'Listar todos as wallets',
                notes: 'Retorna wallets',
                tags: ['api'],
                handler: (req, reply) => this.wallet(req, reply),
            },
        };
    }
    /**
     * @returns [Returns the Route object for HapiRouter to setup]
     * @memberOf HelloWorldRoute
     */
    getBalanceWallet() {
        return {
            path: '/balanceWallet',
            method: 'POST',
            config: {
                description: 'Balanceia a wallet de um usuário',
                notes: 'Retorna wallet balanceada',
                tags: ['api'],
                validate: {
                    payload: {
                        old_id: joi.string().required(),
                        investments_id: joi.array().required()
                    },
                },
                handler: (req, reply) => this.balanceWallet(req, reply),
            },
        };
    }
    routes() {
        return [this.getWallet(), this.getBalanceWallet(), this.createWallet()];
    }
}
exports.WalletRoute = WalletRoute;
//# sourceMappingURL=WalletRoute.js.map