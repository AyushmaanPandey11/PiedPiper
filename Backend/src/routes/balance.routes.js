import { Router } from "express";
import { makeTransaction } from "../controllers/balance.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/getAccBalance",verifyJWT, getUserBalance);
router.patch("/update",verifyJWT,updateBalance);
router.post("/transact",verifyJWT,makeTransaction);

export default balanceRouter;