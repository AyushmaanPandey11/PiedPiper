import { Router } from "express";
import { makeTransaction } from "../controllers/balance.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/getAccBalance").get(verifyJWT, getUserBalance);
router.route("/update").patch(verifyJWT,updateBalance);
router.route("/transact").post(verifyJWT,makeTransaction);

export default balanceRouter;