import React, { useState } from 'react';
import { CurrencyPairs } from '../utils/constants';
import useCurrencyConversion from '../hooks/useCurrencyConversion';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstants';

const CurrencySection = () => {
  const langKey = useSelector((store)=> store.user?.lang);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };
  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  useCurrencyConversion({fromCurrency,toCurrency,amount});


  const handleConversion = () => {
    const converted = amount * 1; 
    setConvertedAmount(converted);
  };

  return (
    <div className="mt-30">
      <h2 className="text-center font-bold text-5xl mt-10">{lang[langKey].CurrencyConverter}</h2>
      <div className="ml-[400px] mt-20 px-4 flex flex-col justify-center w-3/5 h-[500px] bg-blue-600 text-white text-2xl rounded-2xl cursor-pointer">
        <div className="flex flex-row">
          <div className="flex flex-col ml-56   ">
            <label  htmlFor="fromCurrency">{lang[langKey].FromCurrency}</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="mt-2 px-4 w-full bg-white text-black rounded-full cursor-pointer -mx-16"
            >
            {CurrencyPairs.map( 
              currency => <option  key={currency.identifier} value={currency.identifier}>{currency.name}
                      </option>)}
            </select>
          </div>
          <div className="flex flex-col ml-[125px]">
            <label htmlFor="toCurrency">{lang[langKey].ToCurrency}</label>
            <select
              id="fromCurrency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="mt-2 px-4 w-full bg-white text-black rounded-full cursor-pointer -mx-16"
            >
            {CurrencyPairs.map( 
              currency => <option  key={currency.identifier} value={currency.identifier}>{currency.name}
                      </option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-col mt-4">
        </div>
        <div className="flex flex-col mt-4 ml-[500px] w-1/4">
          <label htmlFor="amount">{lang[langKey].Amount}</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="mt-2 px-4 bg-white text-black rounded-full w-full -ml-24"
          />
        </div>
        <button onClick={handleConversion} className="mt-10 px-4 py-2 bg-white text-black rounded-full cursor-pointer w-1/4 ml-[405px]">
          {lang[langKey].Convert}
        </button>
        {/* Display the converted amount */}
        {convertedAmount !== null && (
          <p className="mt-6 ml-[405px] ">Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}</p>
        )}
      </div>
    </div>
  );
};

export default CurrencySection;
