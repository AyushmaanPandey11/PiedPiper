import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { CurrencyPairs } from '../utils/constants';
import lang from '../utils/languageConstants';

const Transactions = ({ transaction }) => {
  const langKey = useSelector((store)=>store.site?.Language);
  const rate = useSelector((store) => store?.user?.conversionRate);
  const currency = useSelector((store) => store.user?.userDetail?.user?.currency);
  const { receiverUsername, senderUsername, initialAmount, initialCurrency, amount, createdAt, reason } = transaction;
  let convertedAmount = null;

  if (rate !== null) {
    convertedAmount = amount * rate;
  }

  const formattedDate = format(new Date(createdAt), 'PPpp');
  const isCredited = senderUsername === receiverUsername;
  const amountClass = isCredited ? 'text-green-500' : 'text-red-500';
  const amountSign = isCredited ? '+' : '-';
  const finalAmount = (convertedAmount === null) ? amount.toFixed(2) : convertedAmount.toFixed(2);

  // Find the currency symbol
  const currencyPair = CurrencyPairs.find(pair => pair.identifier === currency);
  const currencySymbol = currencyPair ? currencyPair.symbol : '';

  return (
    <div className="m-2 p-4 border rounded-lg border-gray-300 bg-white shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <div className='flex flex-row'>
            <div className="font-bold text-lg mb-2">{lang[langKey].PaidTo} :</div>
            <div className="text-gray-700 text-3xl font-bold ml-3 -mt-2">{receiverUsername}</div>
          </div>
          {reason && (
            <div className="text-gray-700 text-md mt-1">
              <span className="font-bold">{lang[langKey].Reason}: </span>{reason}
            </div>
          )}
          {initialAmount && initialCurrency && (
            <div className="text-gray-700 text-md mt-1">
              <span className="font-bold">{lang[langKey].AmountAndCurrencyDuringPayment}: </span>{initialAmount} {initialCurrency}
            </div>
          )}
        </div>
        <div className={`text-xl font-semibold ${amountClass}`}>
          {amountSign} {currency} ({currencySymbol}) {finalAmount}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className='flex flex-row'>
          <div className="font-bold mr-2">{lang[langKey].Date}:</div>
          <div className="text-gray-700">{formattedDate}</div>
        </div>
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            {isCredited ? lang[langKey].Credited : lang[langKey].Debited}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
