"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../config/mongoose");
const schema = mongoose_1.default.Schema;
const walletSchema = new mongoose_1.default.Schema({
    userId: String,
    status: {
        default: 'active',
        type: String,
    },
    investments: [{ type: schema.Types.ObjectId, ref: 'Investment' }],
});
exports.default = mongoose_1.default.model('Wallet', walletSchema);
//# sourceMappingURL=WalletModel.js.map