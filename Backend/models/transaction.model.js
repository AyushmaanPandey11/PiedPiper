import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema(
    {
        sender: {
            type : Schema.Types.ObjectId,
            ref: "User"
        },
        receiver: {
            type : Schema.Types.ObjectId,
            ref: "User"
        },
        amount: {
            type: Number,
            required: true
        },
        Reason: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const Transactions = mongoose.model("Transactions",transactionSchema);
