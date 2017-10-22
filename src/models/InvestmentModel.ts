import mongoose from './../config/mongoose';

const investmentSchema = new mongoose.Schema({
  DT_POSICAO: String,
  CD_CLIENTE: Number,
  DS_CLIENTE: String,
  CD_FUNDO: Number,
  NM_FUNDO: String,
  VL_PENDENTE: Number,
  VL_APLICADO: Number,
  VL_ATUAL: Number,
  VL_BRUTO: Number,
  VL_LIQUIDO: Number,
  VL_IMPOSTO_RENDA: Number,
  VL_RENDIMENTO: Number,
  VL_IOF: Number,
  VL_COTA: Number,
  QTD_COTA: Number,
});

export default mongoose.model('Investment', investmentSchema);
