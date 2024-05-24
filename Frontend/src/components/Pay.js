import React, { useState, useEffect, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { CurrencyPairs } from '../utils/constants';
import { Link } from 'react-router-dom';

const Pay = () => {
  const receiverIdRef = useRef('');
  const [receiverUsername, setReceiverUsername] = useState('');
  const currencyRef = useRef('USD');
  const amountRef = useRef('');
  const pinRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    //
  };

  const handleReceiverIdChange = async (e) => {
    const id = e.target.value;
    receiverIdRef.current = id;
    if (id) {
      setReceiverUsername('exampleUsername'); 
    } else {
      setReceiverUsername('');
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) { 
      pinRef.current = value;
    }
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
      const result = { success: Math.random() > 0.5 }; // Random success/failure for demo
      setTransactionResult(result);
    } catch (error) {
      setTransactionResult({ success: false });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div >
      <div className="h-28" >
        <img className='w-30 h-full m-4  ' 
        src="./LOGO.jpg" alt='LOGO_IMG' />
      </div>
        <div className="max-w-lg mx-auto p-6 bg-blue-600 rounded-lg shadow-md mt-24 ">
        <h1 className="text-3xl font-bold mb-4 text-center">Make a Transaction</h1>
        <form onSubmit={handleTransaction}>
          <div className="mb-4">
            <label className="block text-gray-700">Receiver ID</label>
            <input
              type="text"
              onChange={handleReceiverIdChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          {receiverUsername && (
            <div className="mb-4">
              <label className="block text-gray-700">Receiver Username</label>
              <input
                type="text"
                value={receiverUsername}
                readOnly
                className="mt-1 p-2 border border-transparent rounded w-full bg-gray-100"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Currency</label>
            <select
              ref={currencyRef}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              {CurrencyPairs.map((curr) => (
                <option key={curr.identifier} value={curr.name}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              ref={amountRef}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">6-digit PIN</label>
            <input
              type="password"
              ref={pinRef}
              onChange={handlePinChange}
              maxLength="6"
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
              'Make Payment'
            )}
          </button>
        </form>
        {transactionResult && (
          <div
            className={`mt-4 p-2 rounded ${
              transactionResult.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {transactionResult.success ? 'Payment Successful!' : 'Payment Failed!'}
          </div>
        )}
        <div className='bg-green-700 text-white w-2/5 p-3 rounded-md my-5 mx-32 font-bold' >
        <Link to="/browse"><button className='mx-8'>Home page</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Pay;
