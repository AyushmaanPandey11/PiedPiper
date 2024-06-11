import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Balance } from "../models/balance.model.js";
import axios from "axios";
import mongoose from "mongoose";
import { Transaction } from "../models/transaction.model.js";
import { CURRENCY_API_URI } from "../constants.js";
import { getUserId } from "./user.controller.js";
import { User } from "../models/user.model.js";

const getUserBalance = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const balance = await Balance.aggregate([
        {
            $match: { user: new mongoose.Types.ObjectId(userId) } 
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $project: {
                _id: 0, 
                accountBalance: 1
            }
        }
    ]);

    if (!balance || balance.length === 0) {
        throw new ApiError(400, "Error fetching the user balance, invalid userId");
    }

    return res.status(200).json(new ApiResponse(200, balance[0], "User balance fetched successfully"));
});


const updateBalance = async function(userId, newBalance) {
    try {
        // Update the balance in the Balance collection
        const updatedBalance = await Balance.findOneAndUpdate(
            { user: new mongoose.Types.ObjectId(userId) },
            { accountBalance: newBalance },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // Check if user exists
        if (!updatedBalance) {
            throw new ApiError(400, "User not found");
        }

        return updatedBalance.accountBalance;
    } catch (error) {
        throw new ApiError(400, "Error in updating the user account Balance");
    }
};



const getBalance = async function(userId) {
    try {
        const userBalance = await Balance.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) } 
            },
            {
                $project: { accountBalance: 1, _id: 0 }
            }
        ]);
        if (userBalance.length === 0) {
            throw new ApiError(404, "User not found");
        }
        return userBalance[0].accountBalance; // Return user's account balance
    } catch (error) {
        throw new ApiError(400, "Error in fetching the user account Balance");
    }
};

const addTransactionDetails = async function(senderId, receiverId, amount, reason,initialCurrency,initialAmount) {
    try {
        // Create a ntransaction document
        
        const newTransaction = new Transaction({
            sender: senderId,
            receiver: receiverId,
            amount: amount,
            initialAmount:initialAmount,
            initialCurrency:initialCurrency,
            reason: reason, 
        });

        // Save the transactionn

      
        await newTransaction.save();

        return newTransaction;
    } catch (error) {
        throw new ApiError(500, "Error in adding the transaction details");
    }
};




const makeTransaction = asyncHandler(async (req, res) => {
    const { receiver, amount, initialCurrency, reason, pin, } = req.body;
    const senderId = req.user?._id;
    if (!(receiver && senderId && amount && initialCurrency && reason && pin)) {
        throw new ApiError(400, "Please enter all the details");
    }

    // Fetch the user from the database
    const sender = await User.findById(senderId);
    if (!sender) {
        throw new ApiError(404, "Sender not found");
    }

    // Verify the pin
    const isPinCorrect = await sender.isPinCorrect(pin);
    if (!isPinCorrect) {
        throw new ApiError(400, "Incorrect transaction pin");
    }

    const receiverId = await getUserId(receiver);
    const senderBalance = await getBalance(senderId);
    const receiverBalance = await getBalance(receiverId);
    let updateBalanceSender;
    let updateBalanceReceiver;
    let convertedAmount;

    if (initialCurrency === "USD") {
        if (senderBalance - amount < 0) {
            throw new ApiError(400, "Transaction not possible. Insufficient Balance");
        }
        updateBalanceSender = senderBalance - Number(amount);
    } else {
        const response = await axios.get(`${CURRENCY_API_URI}/${String(initialCurrency)}/USD`);
        const conversionRate = response?.data?.conversion_rate;
        convertedAmount = amount * conversionRate;
        if (senderBalance - convertedAmount < 0) {
            throw new ApiError(400, "Transaction not possible. Insufficient Balance");
        }
        updateBalanceSender = senderBalance - Number(convertedAmount);
    }

    // Update sender balance
    const updatedSenderBal = await updateBalance(senderId, updateBalanceSender);
    
    // Update receiver balance
    updateBalanceReceiver = (initialCurrency === "USD") 
        ? (Number(receiverBalance) + Number(amount)) 
        : (Number(receiverBalance) + Number(convertedAmount));
    const updatedReceiverBal = await updateBalance(receiverId, updateBalanceReceiver);
        
    // Check if balances are updated successfully
    if (updatedSenderBal !== updateBalanceSender || updatedReceiverBal !== updateBalanceReceiver) {
        throw new ApiError(500, "Error in updating balance");
    }

    // Add transaction details only if balances are updated successfully
    const transactionAmount = initialCurrency === "USD" ? amount : convertedAmount;
    const details = await addTransactionDetails(senderId,receiverId,transactionAmount,reason,initialCurrency,amount);
    return res
        .status(200)
        .json(new ApiResponse(200, details ,"Transaction Successful"));    
});






export {  getBalance,updateBalance,getUserBalance, makeTransaction };