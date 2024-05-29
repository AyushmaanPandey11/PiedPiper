import React, { useState, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { CurrencyPairs, SUPPORTED_LANG } from '../utils/constants';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import TransactionDetails from './TransactionDetails';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import { changeLanguage } from '../utils/redux/siteSlice';

const Pay = () => {
  const receiverRef = useRef('');
  const currencyRef = useRef('');
  const amountRef = useRef('');
  const reasonRef = useRef('');
  const pinRef = useRef('');
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.site?.Language);
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) { 
      pinRef.current = value;
    }
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    const pinValue = pinRef.current;

    if (pinValue.length !== 6) {
      setTransactionResult({ success: false, message: 'PIN must be exactly 6 digits' });
      return;
    }

    setIsLoading(true);
    setTransactionResult(null);

    try {
      const transactionData = {
        receiver: receiverRef.current.value,
        initialCurrency: currencyRef.current.value,
        amount: parseFloat(amountRef.current.value),
        pin: pinValue,
        reason: reasonRef.current.value
      };
      const response = await axiosInstance.post('/accBalance/transact', transactionData);
      console.log(response.data);
      const result = response.data;

      if (result.success) {
        setTransactionResult({ message: result.message, data: result.data, success:result.success });
      }
    } catch (error) {
      setTransactionResult({ success: false, message: 'Transaction Failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative min-h-screen'>
      <div className='relative z-10'>
      <div className='flex justify-between items-center p-4 mt-20 '>
        <img className='w-30 h-28 ml-4' src="./LOGO.jpg" alt='LOGO_IMG' style={{ marginTop: '-5rem' }} />
        <select className='px-5 justify-start -mt-10 mr-4 font-bold h-10 bg-blue-900 border-none text-white' onChange={handleLangChange} value={langKey}>
          {
            SUPPORTED_LANG.map(lang => (
              <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
            ))
          }
        </select>
      </div>
      <div className="max-w-lg mx-auto p-6 bg-blue-600 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-4 text-center">{lang[langKey].MakeAtransaction}</h1>      
        {transactionResult && transactionResult.success ? (
          <TransactionDetails transaction={transactionResult.data} />
        ) : (
          <form onSubmit={handleTransaction}>
            <div className="mb-4">
              <label className="block text-gray-700">{lang[langKey].ReceiverUsername}</label>
              <input
                type="text"
                ref={receiverRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{lang[langKey].Currency}</label>
              <select
                ref={currencyRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                {CurrencyPairs.map((curr) => (
                  <option key={curr.identifier} value={curr.identifier}>
                    {curr.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{lang[langKey].Amount}</label>
              <input
                type="number"
                ref={amountRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{lang[langKey].SixDigPin}</label>
              <input
                type="password"
                ref={pinRef}
                onChange={handlePinChange}
                maxLength="6"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">{lang[langKey].Reason}</label>
              <input
                type="text"
                ref={reasonRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-800 text-white py-2 px-4 rounded hover:bg-red-800 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                lang[langKey].MakePayment
              )}
            </button>
          </form>
        )}
        {transactionResult && !transactionResult.success && (
          <div className="mt-4 p-2 rounded bg-red-500 text-white">
            {transactionResult.message}
          </div>
        )}
        <div className="bg-green-700 text-white w-2/5 p-3 rounded-md my-5 mx-32 font-bold">
          <Link to="/browse"><button className="mx-8 pl-6">{lang[langKey].Home}</button></Link>
        </div>
      </div>
    </div>
</div>

  );
};

export default Pay;




