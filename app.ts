import * as hapi from 'hapi';
// import Inert from 'inert'; // Usado para exposição de arquivos estáticos.
const vision = require('vision'); // Usado para administração de template engines
const inert = require('inert'); // Usado para administração de template engines
const hapiJwt = require('hapi-auth-jwt2');
const hapiSwagger = require('hapi-swagger');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Routes import
import { HelloWorldRoute } from './src/routes/HelloWolrdRoute';
import { InvestmentRoute } from './src/routes/Investment';
import { WalletRoute } from './src/routes/WalletRoute';

async function startApi() {
  try {
    // Instancia o HapiJS
    const server = new hapi.Server();

    await server.connection({ port: process.env.PORT || 4000 });

    await server.register([
      inert,
      vision,
      {
        register: hapiSwagger,
        options: { info: { title: 'Minha API', version: '1.0' } },
      },
    ]);

    // System routes
    await server.route(new HelloWorldRoute().routes());
    await server.route(new WalletRoute().routes());
    await server.route(new InvestmentRoute().routes());

    await server.start();

    console.info(`SERVER RUNNING: ${(server.info || { uri: '' }).uri}`);
  } catch (error) {
    console.error(`Falha na inicialização da API: ${error}`);
  }
}

// Bootstrap da API
export default startApi();
