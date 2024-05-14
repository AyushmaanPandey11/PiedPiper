import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Balance } from "../models/balance.model.js";
import axios from "axios";

const getUserBalance = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const balance = await Balance.aggregate([
        {
            $match: { user: mongoose.Types.ObjectId(userId) } 
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


const makeTransaction = asyncHandler( async (req,res) => {
    const {receiverId,amount,currency,reason} = req.body;
    const senderId = req.user?._id;
    // both are in dollar 
    const senderBalance = await Balance.getBalance(senderId);
    const receiverBalance = await Balance.getBalance(receiverId);
    let updateBalanceSender;
    if(currency === "USD")
    {
        if( senderBalance - amount < 0 )
        {
            throw new ApiError(400, "Transaction not possible. Un-sufficient Balance");
        }
        updateBalanceSender = senderBalance - amount;
        // sender balance
        updateBalance(senderId,updateBalanceSender);
        // receiver balance
        updateBalance(receiverId,receiverBalance+amount);
    }
    else
    {
        // making api
        const response = await axios.get(`${CURRENCY_API_URL}/${currency}/USD`);
        const conversionRate = response?.data?.conversion_rate;
        const newAmount = amount*conversionRate;
        if( senderBalance - newAmount < 0 )
        {
            throw new ApiError(400, "Transaction not possible. Un-sufficient Balance");
        }
        updateBalanceSender = senderBalance-newAmount;
        updateBalance(senderId,updateBalanceSender);
        updateBalance(receiverId,receiverBalance+newAmount);
    }
    Balance.addTransactionDetails(senderId,receiverId,amount,reason);
    return res
    .status(200)
    .json(200, "Transaction was Successfull")
} );

export {  getUserBalance, makeTransaction };