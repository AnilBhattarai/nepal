const mongoose = require('mongoose');
const schema = mongoose.Schema;


const bankDetailForLoanSchema = new schema({
    Bank_Name: { type: String },
    Logo: { type: schema.Types.Mixed },
    Rate_Of_interest: { type: String },
    Processing_Fees: { type: String },
    IS_Include_VAT: { type: Boolean ,default:true},
    Max_Tenure: { type: Number },
    Min_Tenure: { type: Number },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
    deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
    added_by: { type: schema.Types.ObjectId, ref: 'users' },
    added_at: { type: Date, default: Date.now },
    updated_by: { type: schema.Types.ObjectId, ref: 'users' },
    updated_at: { type: Date },
});

module.exports = bankDetailForLoan = mongoose.model('bankDetailForLoan', bankDetailForLoanSchema);

