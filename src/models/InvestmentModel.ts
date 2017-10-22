import mongoose from './../config/mongoose';

const investmentSchema = new mongoose.Schema({
  code: String,
  cnpj: String,
  name: String,
  id: String,
  investmentQuotation: String,
  morningStar: String,
  minimalInvestment: Number,
  administrationRate: Number
});

export default mongoose.model('Investment', investmentSchema);