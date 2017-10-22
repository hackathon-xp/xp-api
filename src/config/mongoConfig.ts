const port = process.env.MONGO_PORT || 27017;
// const uri = process.env.MONGO_HOST || `mongodb://localhost:${port}/xp`;
const uri =
  // tslint:disable-next-line:max-line-length
  'mongodb://grupo04:Ougyl7O1uR6dCQYoFUKaG31zPvnELgkMpzDDKWO2JiAbvCci80EiuMLNekjGr6yHBCeUFYGtNb2761zHXziAkA==@grupo04.documents.azure.com:10255/?ssl=true&replicaSet=globaldb&authSource=admin';
const options = {};

export default {
  options,
  connection: uri,
};
