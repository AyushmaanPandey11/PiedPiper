import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CURRENCY_API_URL } from '../utils/constants';

const TransactionDetails = ({ transaction }) => {
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
          setAmountInUserCurr(result);
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
  }, [currency, initialCurrency]);

  return (
    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transaction Successful</h2>
      <h2 className="text-xl font-bold mb-1">Details:</h2>
      <p><strong>Sender ID:</strong> {sender}</p>
      <p><strong>Receiver ID:</strong> {receiver}</p>
      <p><strong>Amount & Currency During Payment: </strong>{initialAmount} {initialCurrency} </p>
      <p><strong>Amount in {currency}: </strong> {amountInUserCurr} </p>
      <p><strong>Reason:</strong> {reason}</p>
      <p><strong>Transaction ID:</strong> {_id}</p>
      <p><strong>Time :</strong> {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default TransactionDetails;
