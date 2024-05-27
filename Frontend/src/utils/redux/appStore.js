import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './userSlice';
import { siteReducer } from "./siteSlice";

const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            site: siteReducer
        },
    },
);

export default appStore;