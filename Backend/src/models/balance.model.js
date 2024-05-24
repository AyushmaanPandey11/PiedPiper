import mongoose, { Schema } from "mongoose";


const balanceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },   
    accountBalance: {
        type: Number,
        default: 1000
    }
},
{
    timestamps:true
});

export const Balance = mongoose.model("Balance", balanceSchema);
