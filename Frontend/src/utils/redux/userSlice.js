import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name : "user",
        initialState : {
            lang : 'eng',
            userDetail : [],
            balance : null,
        },
        reducers : {
            addUser : (state,action) => {
                state.userDetail = action.payload;
            },
            removeUser : (state,action) => {
                return null;
            },
            changeLanguage : (state,action) => {
                state.lang = action.payload;
            },
            addBalance: (state,action) => {
                state.balance= action.payload;
            }
        }
    }
);

export const { addUser, removeUser,changeLanguage, addBalance } = userSlice.actions;
export const  userReducer = userSlice.reducer;

export default userSlice.reducer;