import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './userSlice';
import { siteReducer } from "./siteSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
    key:"root",
    version:1,
    storage
};

const reducer = combineReducers({
    user: userReducer,
    site: siteReducer
});

const persistedReducer = persistReducer(persistConfig,reducer);

const appStore = configureStore(
    {
        reducer : persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: false,
            }),
    },
);

export default appStore;