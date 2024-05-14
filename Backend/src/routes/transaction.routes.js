import { Router } from "express";
import { getTransactionDetails } from "../controllers/transaction.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

// Routes to transaction controllers 

router.get("/getTransactionDetails",verifyJWT,getTransactionDetails);

export default transactionRouter;