import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'
import transactionRouter from "./routes/transaction.routes.js";
import balanceRouter from "./routes/balance.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// Routes 

//  1. UserDetails routes 



app.use("/api/v1/users", userRouter)

// 2. Balance routes

app.use("/api/v1/accbalance", balanceRouter);



// 3. Transaction details routes
app.use("/api/v1/transactionHistory", transactionRouter);



// 
export { app };