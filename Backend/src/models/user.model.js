import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'username is required'],
            lowercase: true,
            trim: true, 
            
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        
        // phone_no:{
        //     type:Number,
        //     required:[true, 'Phone no is required'],
        //     unique: true
        // },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        pin: {
            type: String,
            required: [true, 'Transaction Pin is required']
        },
        currency : {
            type: String,
            required: [true, 'Currency is required']
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("pin")) return next();

    // Convert pin to string before hashing
    const pinAsString = this.pin.toString();
    this.pin = await bcrypt.hash(pinAsString, 10);
    next();
});

 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.isPinCorrect = async function(pin){
    return await bcrypt.compare(pin, this.pin);
}


// userSchema.methods.createUserWithBalance = async function(userId) {
//     try {
//         // Create user
//         const user = await this.create(userData);
        
//         // Create balance for the user
//         await Balance.createUserBalance(user._id);

//         return user;
//     } catch(error) {
//         throw new ApiError(500, "Error creating user with balance");
//     }
// };

userSchema.methods.generateAccessToken =  function(){
    
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken =  function(){
    return  jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);