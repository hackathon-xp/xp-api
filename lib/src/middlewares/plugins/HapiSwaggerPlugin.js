"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapiSwagger = require('hapi-swagger');
exports.default = {
    register: hapiSwagger,
    options: {
        info: {
            title: '*Titulo da documentação aqui!*',
            version: '1.0.0',
        },
    },
};
//# sourceMappingURL=HapiSwaggerPlugin.js.map