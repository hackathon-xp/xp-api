const port = process.env.MONGO_PORT || 27017;
// const uri = process.env.MONGO_HOST || `mongodb://localhost:${port}/xp`;
const uri =
  // tslint:disable-next-line:max-line-length
  'mongodb://grupoo4:kdTO8y0mokBPQAwnp8xviiI9jwONUKHvBjGu1zKUtL9BSTLjKWEVbDjN1LUKsh5VVp1nodXMOxdh739QBFwr3Q==@grupoo4.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
const options = {};

export default {
  options,
  connection: uri,
};
