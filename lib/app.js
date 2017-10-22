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
const hapi = require("hapi");
// import Inert from 'inert'; // Usado para exposição de arquivos estáticos.
const vision = require('vision'); // Usado para administração de template engines
const inert = require('inert'); // Usado para administração de template engines
const hapiJwt = require('hapi-auth-jwt2');
const hapiSwagger = require('hapi-swagger');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Routes import
const HelloWolrdRoute_1 = require("./src/routes/HelloWolrdRoute");
const Investment_1 = require("./src/routes/Investment");
const WalletRoute_1 = require("./src/routes/WalletRoute");
function startApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Instancia o HapiJS
            const server = new hapi.Server();
            yield server.connection({ port: process.env.PORT || 4000 });
            yield server.register([
                inert,
                vision,
                {
                    register: hapiSwagger,
                    options: { info: { title: 'Minha API', version: '1.0' } },
                },
            ]);
            // System routes
            yield server.route(new HelloWolrdRoute_1.HelloWorldRoute().routes());
            yield server.route(new WalletRoute_1.WalletRoute().routes());
            yield server.route(new Investment_1.InvestmentRoute().routes());
            yield server.start();
            console.info(`SERVER RUNNING: ${(server.info || { uri: '' }).uri}`);
        }
        catch (error) {
            console.error(`Falha na inicialização da API: ${error}`);
        }
    });
}
// Bootstrap da API
exports.default = startApi();
//# sourceMappingURL=app.js.map