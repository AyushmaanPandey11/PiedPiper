import { Router } from "express";
import { makeTransactionSecured } from "../controllers/secureTransaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const securePaymentRouter = Router();

securePaymentRouter.post("/transfer",verifyJWT,makeTransactionSecured);
export {securePaymentRouter};