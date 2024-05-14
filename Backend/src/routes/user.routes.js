import {Router} from "express"
import { changeCurrentPassword, changeCurrentPin, 
    getCurrentUser, getUserCurrency, loginUser, logoutUser, 
    refreshAccessToken, registerUser, 
    updateUserDetails} from "../controllers/user.controller"

const router = Router()

router.post("/register",registerUser);
router.post("/login",loginUser);

// secure Routes
router.post("/logout",verifyJwt,logoutUser);
router.post("/refresh-token",refreshAccessToken);
router.patch("/change-password",verifyJwt,changeCurrentPassword);
router.patch("/change-pin",verifyJwt,changeCurrentPin);
router.get("/current-user",verifyJwt,getCurrentUser);
router.get("/current-currency",verifyJwt,getUserCurrency);
router.patch("/update-account",verifyJwt,updateUserDetails);

export default userRouter;