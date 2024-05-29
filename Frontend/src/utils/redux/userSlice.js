import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetail: [], // Initialize as an array
    balance: null,
    transactions: [],
    conversionRate: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userDetail = action.payload;
        },
        removeUser: () => {
            return initialState; // Return the initial state instead of null
        },
        addBalance: (state, action) => {
            state.balance = action.payload;
        },
        addTransactionHistory: (state, action) => {
            state.transactions = action.payload;
        },
        addConversionRate: (state, action) => {
            state.conversionRate = action.payload;
        },
    },
});

export const {
    addUser,
    removeUser,
    addBalance,
    addTransactionHistory,
    addConversionRate,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export default userSlice.reducer;
