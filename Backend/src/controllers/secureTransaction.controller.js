import { Transaction } from "../models/transaction.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { getBalance } from "./balance.controller";
import { getUserId } from "./user.controller";

const updateBalanceSecured = async function(userId, newBalance, session) {
    try {
        // Update the balance in the Balance collection within the session
        const updatedBalance = await Balance.findOneAndUpdate(
            { user: new mongoose.Types.ObjectId(userId) },
            { accountBalance: newBalance },
            { new: true, runValidators: true, session } // Return the updated document, run validators, and use the session
        );

        // Check if user exists
        if (!updatedBalance) {
            throw new ApiError(400, "User not found");
        }

        return updatedBalance.accountBalance;
    } catch (error) {
        throw new ApiError(400, "Error in updating the user account balance");
    }
};
const addTransactionDetailsSecured = async function(senderId, receiverId, amount, reason, initialCurrency, initialAmount, session) {
    try {
        // Create a new transaction document
        const newTransaction = new Transaction({
            sender: senderId,
            receiver: receiverId,
            amount: amount,
            initialAmount: initialAmount,
            initialCurrency: initialCurrency,
            reason: reason, 
        });

        // Save the transaction within the session
        await newTransaction.save({ session });

        return newTransaction;
    } catch (error) {
        throw new ApiError(500, "Error in adding the transaction details");
    }
};
const makeTransactionSecured = asyncHandler(async (req, res) => {
    // Starting the transaction session before the algorithm
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { receiver, amount, initialCurrency, reason, pin } = req.body;
        const senderId = req.user?._id;
        if (!(receiver && senderId && amount && initialCurrency && reason && pin)) {
            throw new ApiError(400, "Please enter all the details");
        }

        // Fetch the user from the database
        const sender = await User.findById(senderId).session(session);
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
        const updatedSenderBal = await updateBalanceSecured(senderId, updateBalanceSender, session);

        // Update receiver balance
        updateBalanceReceiver = (initialCurrency === "USD") 
            ? (Number(receiverBalance) + Number(amount)) 
            : (Number(receiverBalance) + Number(convertedAmount));
        const updatedReceiverBal = await updateBalanceSecured(receiverId, updateBalanceReceiver, session);
        
        // Check if balances are updated successfully
        if (updatedSenderBal !== updateBalanceSender || updatedReceiverBal !== updateBalanceReceiver) {
            throw new ApiError(500, "Error in updating balance");
        }

        // Add transaction details only if balances are updated successfully
        const transactionAmount = initialCurrency === "USD" ? amount : convertedAmount;
        const details = await addTransactionDetailsSecured(senderId, receiverId, transactionAmount, reason, initialCurrency, amount, session);
        
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return res
            .status(200)
            .json(new ApiResponse(200, details, "Transaction Successful"));

    } catch (error) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
});
export {makeTransactionSecured};