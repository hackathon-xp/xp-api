import mongoose from './../config/mongoose';

const investmentSchema = new mongoose.Schema({
  code: String,
  cnpj: String,
  name: String,
  id: String,
  investmentQuotation: String,
  classification: Object,
  investmentConditions: Object,
});

export default mongoose.model('Investment', investmentSchema);
