"use strict";
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
async function startApi() {
    try {
        // Instancia o HapiJS
        const server = new hapi.Server();
        await server.connection({ port: process.env.APP_PORT || 3000 });
        await server.register([
            inert,
            vision,
            {
                register: hapiSwagger,
                options: { info: { title: 'Minha API', version: '1.0' } },
            },
        ]);
        // System routes
        await server.route(new HelloWolrdRoute_1.HelloWorldRoute().routes());
        await server.route(new Investment_1.InvestmentRoute().routes());
        await server.start();
        console.info(`SERVER RUNNING: ${(server.info || { uri: '' }).uri}`);
    }
    catch (error) {
        console.error(`Falha na inicialização da API: ${error}`);
    }
}
// Bootstrap da API
exports.default = startApi();
//# sourceMappingURL=app.js.map