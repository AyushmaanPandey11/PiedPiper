import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CURRENCY_API_URL } from '../utils/constants';
import lang from '../utils/languageConstants';

const TransactionDetails = ({ transaction }) => {
  const langKey = useSelector((store)=> store.site?.Language);
  const {sender, receiver,amount,initialAmount,initialCurrency,reason,_id,createdAt,} = transaction;
  const [amountInUserCurr,setAmountInUserCurr]= useState(null);
  const currency = useSelector((state) => state.user?.userDetail?.user?.currency);
  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const response = await axios.get(
          `${CURRENCY_API_URL}/${initialCurrency}/${currency}`
        );
        const result = response?.data?.conversion_rate;
        if (result) {
          setAmountInUserCurr(result*amount);
        } else {
          console.error("Error: Conversion rate not found in API response");
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    if (initialCurrency && currency) {
      convertCurrency();
    }
  }, [currency, initialCurrency,amount]);

  return (
    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{lang[langKey].TransactionSuccessfull}</h2>
      <h2 className="text-xl font-bold mb-1">{lang[langKey].Details}:</h2>
      <p><strong>{lang[langKey].SenderId}:</strong> {sender}</p>
      <p><strong>{lang[langKey].ReceiverId}:</strong> {receiver}</p>
      <p><strong>{lang[langKey].AmountAndCurrencyDuringPayment}: </strong>{initialAmount} {initialCurrency} </p>
      <p><strong>{lang[langKey].AmountIn} {currency}: </strong> {amountInUserCurr} </p>
      <p><strong>{lang[langKey].Reason}:</strong> {reason}</p>
      <p><strong>{lang[langKey].TransactionId}:</strong> {_id}</p>
      <p><strong>{lang[langKey].Time} :</strong> {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default TransactionDetails;
