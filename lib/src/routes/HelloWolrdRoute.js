"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("./../models/UserModel");
class HelloWorldRoute {
    constructor() {
        this.userModel = UserModel_1.default;
    }
    async helloWorld(request, reply) {
        try {
            const result = await this.userModel.create({ name: '123' });
            const user = await this.userModel.find({}).lean(true);
            return reply(user);
        }
        catch (e) {
            console.log(`ERRO`, e);
            return reply(e);
        }
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