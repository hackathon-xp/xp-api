import mongoose from './../config/mongoose';

const investmentSchema = new mongoose.Schema({
  refId: {
    required: true,
    type: String,
  },
});

export default mongoose.model('Investment', investmentSchema);
