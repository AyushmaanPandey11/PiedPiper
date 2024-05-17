import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";


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
                sender: mongoose.Types.ObjectId(userId)
            }
        },
        {
            $project: {
                _id: 1,
                sender: 1,
                receiver: 1,
                amount: 1,
                reason: 1,
                timestamp: 1
            }
        },
        // Union debited transactions with credited transactions
        {
            $unionWith: {
                coll: "transactions",
                pipeline: [
                    // Filter credited transactions
                    {
                        $match: {
                            receiver: mongoose.Types.ObjectId(userId)
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            sender: 1,
                            receiver: 1,
                            amount: 1,
                            reason: 1,
                            timestamp: 1
                        }
                    }
                ]
            }
        }
    ]);

    // Send success response with transaction details
    res
    .status(200)
    .json(new ApiResponse(200, "Transaction details fetched successfully", transactions));

});

export { getTransactionDetails };