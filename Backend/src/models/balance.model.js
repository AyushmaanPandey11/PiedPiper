import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Transaction } from "./transaction.model.js";

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

balanceSchema.methods.updateBalance = async function(userId, newBalance) {
    try {
        const updatedBalance = await User.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(userId) }
            },
            {
                $set: { "balance.accountBalance": newBalance } 
            },
            {
                $project: { balance: 1 } 
            }
        ]);

        // Check if user exists
        if (updatedBalance.length === 0) {
            throw new ApiError(400, "User not found")
        }

        // Update the balance in the Balance collection
        await this.model("Balance").findOneAndUpdate(
            { user: userId },
            { accountBalance: newBalance }
        );

        return updatedBalance[0].balance;
    } catch (error) {
        throw new ApiError(400, "Error in updating the user account Balance");
    }
};

balanceSchema.methods.getBalance = async function(userId) {
    try {
        const userBalance = await User.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(userId) } 
            },
            {
                $project: { balance: 1, _id: 0 }
            }
        ]);

        if (userBalance.length === 0) {
            throw new ApiError(404, "User not found");
        }

        return userBalance[0].balance.accountBalance; // Return user's account balance
    } catch (error) {
        throw new ApiError(400, "Error in fetching the user account Balance");
    }
};




balanceSchema.methods.addTransactionDetails = async function(senderId, receiverId, amount, reason) {
    try {
        // Create a new transaction document
        const newTransaction = new Transaction({
            sender: senderId,
            receiver: receiverId,
            amount: amount,
            reason: reason
        });

        // Save the transaction
        await newTransaction.save();

        return newTransaction;
    } catch (error) {
        throw new ApiError(500, "Error in adding the transaction details");
    }
};


export const Balance = mongoose.model("Balance", balanceSchema);
