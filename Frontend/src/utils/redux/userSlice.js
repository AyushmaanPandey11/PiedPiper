import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name : "user",
        initialState : {
            lang : 'eng',
            userDetail : null,
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
            }
        }
    }
);

export const { addUser, removeUser,changeLanguage } = userSlice.actions;
export const  userReducer = userSlice.reducer;

export default userSlice.reducer;