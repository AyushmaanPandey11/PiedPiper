import { Router } from "express";
import { addTransactionDetails, getTransactionDetails } from "../controllers/transaction.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

// Routes to transaction controllers 

router.route("/getTransactionDetails").get(verifyJWT,getTransactionDetails);
router.route("/addTransactionDetails").post(verifyJWT,addTransactionDetails);

export default transactionRouter;