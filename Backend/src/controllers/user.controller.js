import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Balance } from "../models/balance.model.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken;
        //await user.save({ validateBeforeSave: false });
        try {
            await user.save({ validateBeforeSave: false });
        } catch (error) {
            console.error('Error saving user with refreshToken:', error);
            throw new ApiError(500, "Error saving user with refreshToken");
        }
        

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const createUserBalance = async function(userId){
    try {
        const existingBalance = await Balance.findOne({ user: userId });
        if (existingBalance) {
            throw new ApiError(400, "Balance already exists for the user");
        }
        else
        {
            const newUserBalance = await Balance.create({
                user: userId,
                accountBalance: 1000  
            });

            if(!newUserBalance){
                await User.deleteOne({ _id: userId});
                throw new ApiError(500, "Failed to create user balance");
            }
            return newUserBalance;
        }
    } catch(error) {
        throw new ApiError(400, "Error adding user Balance");
    }
};

const registerUser = asyncHandler(async (req, res) => {

    const { email, username, password, pin, currency } = req.body;

    if ([pin,currency, email, username, password].some((field) => field?.trim() === "")) 
    {
        throw new ApiError(400, "All fields are required");
    }
    try{
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            throw new ApiError(400, "User with email or username already exists")
        }

        const user = await User.create({
            email,
            password,
            username: username.toLowerCase(),
            currency,
            pin,
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken -pin"
        )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }
        await generateAccessAndRefereshTokens(user?._id)
        await createUserBalance(createdUser._id);
        

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
    }
    catch (error) {
        if (error.code === 11000) { // Handle MongoDB duplicate key error
            throw new ApiError(400, "Duplicate key error: user with this email or username already exists");
        }
        throw new ApiError(500, "Something went wrong while registering the user");
    }

})

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user?._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -pin")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body



    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const changeCurrentPin = asyncHandler(async (req, res) => {
    const { oldPin, newPin } = req.body;
    console.log(oldPin, newPin);
    const user = await User.findById(req.user?._id)
    const isPinCorrect = await user.isPinCorrect(oldPin)
    if (!isPinCorrect) {
        throw new ApiError(400, "Invalid old Pin")
    }

    user.pin = newPin;
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200,"Pin changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const getUserCurrency = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.currency,
            "User fetched successfully"
        ));
})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { username, email } = req.body

    if (!username || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email: email
            }
        },
        { new: true }

    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    changeCurrentPin,
    getCurrentUser,
    updateUserDetails,
    getUserCurrency
};