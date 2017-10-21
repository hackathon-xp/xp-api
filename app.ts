import * as hapi from 'hapi';
// import Inert from 'inert'; // Usado para exposição de arquivos estáticos.
const vision = require('vision'); // Usado para administração de template engines
const inert = require('inert'); // Usado para administração de template engines
const hapiJwt = require('hapi-auth-jwt2');
const hapiSwagger = require('hapi-swagger');
import { HelloWorldRoute } from './src/routes/HelloWolrdRoute';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// import Joi from 'joi'; // Usado para validação de JSONs.

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
    await server.route(new HelloWorldRoute().routes());
    await server.start();

    console.info(`SERVER RUNNING: ${(server.info || { uri: '' }).uri}`);
  } catch (error) {
    console.error(`Falha na inicialização da API: ${error}`);
  }
}

// Bootstrap da API
export default startApi();
