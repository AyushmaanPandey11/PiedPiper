import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './userSlice';
import { CurrencyReducer } from "./currencyapiSlice";
const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            currency : CurrencyReducer,
        },
    },
);

export default appStore;