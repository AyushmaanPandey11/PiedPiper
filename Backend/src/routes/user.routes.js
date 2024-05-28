import {Router} from "express"
import { changeCurrentPassword, changeCurrentPin, 
    getCurrentUser, getUserCurrency, loginUser, logoutUser, 
    refreshAccessToken, registerUser, 
    updateUserDetails} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register",registerUser);
router.post("/login",loginUser);

// secure Routes
router.post("/logout",verifyJWT,logoutUser);
router.post("/refresh-token",refreshAccessToken);
router.post("/change-password",verifyJWT,changeCurrentPassword);
router.post("/change-pin",verifyJWT,changeCurrentPin);
router.get("/current-user",verifyJWT,getCurrentUser);
router.get("/current-currency",verifyJWT,getUserCurrency);
router.post("/update-account",verifyJWT,updateUserDetails);

export default router;