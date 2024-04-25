
import { useDispatch, useSelector } from "react-redux";
import {CURRENCY_API_URL} from "../utils/constants";
import { addCurrencyData } from "../utils/redux/currencyapiSlice";
import { useCallback, useEffect } from "react";

const useCurrencyConversion = async ({base,target,amount}) => {
    const currencydata = useSelector((store)=> store?.currency );
    const dispatch = useDispatch();
    const getCurrencyUpdates = useCallback( async () => {
        try {
            const response = await fetch(`${CURRENCY_API_URL}/${base}/${target}/${amount}`);
            const data = await response.json();
            console.log(data);
            dispatch(addCurrencyData(data));
        } 
        catch(error) {
            console.error('Error fetching currencies:', error);
        }
    },[dispatch,amount,base,target]);
    useEffect( () => {
        !getCurrencyUpdates && getCurrencyUpdates();
    },[getCurrencyUpdates,currencydata] );
};

export default useCurrencyConversion;