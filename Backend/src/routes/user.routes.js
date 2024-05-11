import {Router} from "express"
import { changeCurrentPassword, changeCurrentPin, 
    getCurrentUser, getUserCurrency, loginUser, logoutUser, 
    refreshAccessToken, registerUser, 
    updateUserDetails} from "../controllers/user.controller"

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secure Routes
router.route("/logout").post(verifyJwt,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").patch(verifyJwt,changeCurrentPassword);
router.route("/change-pin").patch(verifyJwt,changeCurrentPin);
router.route("/current-user").get(verifyJwt,getCurrentUser);
router.route("/current-currency").get(verifyJwt,getUserCurrency);
router.route("/update-account").patch(verifyJwt,updateUserDetails);

export default userRouter;