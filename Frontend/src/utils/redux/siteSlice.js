import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice(
    {
        name : "lang",
        initialState : {
            Language : 'eng',
            loggedIn : false,
        },
        reducers : {
            changeLanguage : (state,action) => {
                state.Language = action.payload;
            },
            changeStatus : (state) => {
                state.loggedIn=!state.loggedIn;
            }
        }
    }
);

export const { changeLanguage,changeStatus } = siteSlice.actions;
export const  siteReducer = siteSlice.reducer;

export default siteSlice.reducer;