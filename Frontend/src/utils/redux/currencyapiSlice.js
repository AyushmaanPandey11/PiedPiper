import { createSlice } from "@reduxjs/toolkit";

const currencyapiSlice = createSlice(
    {
        name : "currencydata",
        initialState : {
            data: null,
            currency : "USD",
        },
        reducers: {
            addCurrencyData : (state,action) => {
                state.data = action.payload;
            }
        }
    }
);

export const { addCurrencyData } = currencyapiSlice.actions;
export const CurrencyReducer = currencyapiSlice.reducer;
export default currencyapiSlice.reducer;