import { Router } from "express";
import { getTransactionDetails } from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Routes to transaction controllers 

router.get("/getTransactionDetails",verifyJWT,getTransactionDetails);

export default router;