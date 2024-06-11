import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { makeTransactionSecured } from "../controllers/secureTransaction.controller";



const securePaymentRouter = Router();

securePaymentRouter.post("/transfer",verifyJWT,makeTransactionSecured);
export {securePaymentRouter};