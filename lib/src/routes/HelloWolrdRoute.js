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
const UserModel_1 = require("./../models/UserModel");
class HelloWorldRoute {
    constructor() {
        this.userModel = UserModel_1.default;
    }
    helloWorld(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userModel.create({ name: '123' });
                const user = yield this.userModel.find({}).lean(true);
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
    getHelloWord() {
        return {
            path: '/helloWorld',
            method: 'GET',
            config: {
                description: 'Listar todos os produtos',
                notes: 'Retorna os produtos',
                tags: ['api'],
                handler: (req, reply) => this.helloWorld(req, reply),
            },
        };
    }
    routes() {
        return [this.getHelloWord()];
    }
}
exports.HelloWorldRoute = HelloWorldRoute;
//# sourceMappingURL=HelloWolrdRoute.js.map