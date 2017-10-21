"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var hapi = require('hapi');
// import Inert from 'inert'; // Usado para exposição de arquivos estáticos.
var vision = require('vision'); // Usado para administração de template engines
var hapiJwt = require('hapi-auth-jwt2');
// import Joi from 'joi'; // Usado para validação de JSONs.
var validate = function (decoded, request, callback) {
    if (decoded)
        return callback(null, true);
    return callback(null, false);
};
function startApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Instancia o HapiJS
            var server = new hapi.Server();
            yield server.connection({ port: global.process.env.APP_PORT });
            yield server.register(vision);
            yield server.register(hapiJwt);
            server.auth.strategy('jwt', 'jwt', {
                key: process.env.JWT_SECRET,
                validateFunc: validate,
                verifyOptions: { algorithms: ['HS256'] }
            });
            server.auth.default('jwt');
            yield server.start();
            console.info("SERVER RUNNING: " + server.info.uri);
        }
        catch (error) {
            console.error("Falha na inicializa\u00E7\u00E3o da API: " + error);
        }
    });
}
exports.__esModule = true;
exports["default"] = startApi();
