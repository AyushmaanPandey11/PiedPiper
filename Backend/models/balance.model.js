import mongoose, {Schema} from "mongoose";

const balanceSchema = new Schema({
    email: 
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username: 
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },    
    accountBalance: 
    {
        type: Number,
        default: 1000
    }
});

export const Balance = new mongoose.model("Balance", balanceSchema);