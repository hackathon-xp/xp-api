"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var port = process.env.MONGO_PORT || 27017;
// const uri = process.env.MONGO_HOST || `mongodb://localhost:${port}/xp`;
var uri = 
// tslint:disable-next-line:max-line-length
'mongodb://grupo04:Ougyl7O1uR6dCQYoFUKaG31zPvnELgkMpzDDKWO2JiAbvCci80EiuMLNekjGr6yHBCeUFYGtNb2761zHXziAkA==@grupo04.documents.azure.com:10255/?ssl=true&replicaSet=globaldb&authSource=admin';
var options = {};
exports.default = {
    options: options,
    connection: uri,
};
//# sourceMappingURL=mongoConfig.js.map