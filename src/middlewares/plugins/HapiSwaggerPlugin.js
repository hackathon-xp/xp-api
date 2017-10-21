"use strict";
var hapiSwagger = require('hapi-swagger');
exports.__esModule = true;
exports["default"] = {
    register: hapiSwagger,
    options: {
        info: {
            title: '*Titulo da documentação aqui!*',
            version: '1.0.0'
        }
    }
};
