import { Router } from "express";
import { getUserBalance, makeTransaction } from "../controllers/balance.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/getAccBalance",verifyJWT, getUserBalance);
router.post("/transact",verifyJWT,makeTransaction);

export default router;