import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import mongoose from "mongoose";

const getTransactionDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const transactions = await Transaction.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "senderDetails"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "receiver",
                foreignField: "_id",
                as: "receiverDetails"
            }
        },
        {
            $match: {
                $or: [
                    { sender: new mongoose.Types.ObjectId(userId) },
                    { receiver: new mongoose.Types.ObjectId(userId) }
                ]
            }
        },
        {
            $unwind: "$senderDetails"
        },
        {
            $unwind: "$receiverDetails"
        },
        {
            $sort: {
                createdAt: -1 // Sort by createdAt field in descending order
            }
        },
        {
            $project: {
                _id: 1,
                sender: 1,
                receiver: 1,
                amount: 1,
                initialAmount: 1,
                initialCurrency: 1,
                reason: 1,
                createdAt: 1,
                senderUsername: "$senderDetails.username",
                receiverUsername: "$receiverDetails.username"
            }
        }
    ]);

    res.status(200).json(new ApiResponse(200, "Transaction details fetched successfully", transactions));
});

export { getTransactionDetails };
