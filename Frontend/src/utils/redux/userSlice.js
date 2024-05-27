import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name : "user",
        initialState : {
            userDetail : [],
            balance : null,
            transactions: [],
            conversionRate: null,
        },
        reducers : {
            addUser : (state,action) => {
                state.userDetail = action.payload;
            },
            removeUser : (state,action) => {
                return null;
            },
            addBalance: (state,action) => {
                state.balance= action.payload;
            },
            addTransactionHistory : (state,action) =>
            {
                state.transactions = action.payload;
            },
            addConversionRate: (state,action) => {
                state.conversionRate=action.payload;
            },
        }
    }
);

export const { addUser, removeUser, addBalance,addTransactionHistory,addConversionRate } = userSlice.actions;
export const  userReducer = userSlice.reducer;

export default userSlice.reducer;