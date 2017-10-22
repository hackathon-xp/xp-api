import mongoose from './../config/mongoose';
const schema = mongoose.Schema;

const walletSchema = new mongoose.Schema({
  userId: String,
  status: {
    default: 'active',
    type: String,
  },
  investments: [{ type: schema.Types.ObjectId, ref: 'Investment' }],
});

export default mongoose.model('Wallet', walletSchema);
