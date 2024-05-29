import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance, addConversionRate, addTransactionHistory } from '../utils/redux/userSlice';
import useAxios from '../hooks/useAxios';
import axios from 'axios';
import { CURRENCY_API_URL } from '../utils/constants';
import Transactions from './Transactions';
import { validatePassword } from '../utils/validate';
import lang from '../utils/languageConstants';

const Profile = () => {
  const langKey = useSelector((store) => store.site?.Language);
  const user = useSelector((store) => store?.user?.userDetail?.user);
  const fetchedBalance = useSelector((store) => store?.user?.balance);
  const transactions = useSelector((store) => store?.user?.transactions);
  const dispatch = useDispatch();
  const axiosInstance = useAxios();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    userId: '',
    balance: '',
    currency: ''
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        username: user.username || '',
        email: user.email || '',
        userId: user._id || '',
        balance: fetchedBalance || '',
        currency: user.currency || ''
      });
    }
  }, [user, fetchedBalance]);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPinForm, setShowPinForm] = useState(false);

  const usernameRef = useRef('');
  const emailRef = useRef('');
  const oldPasswordRef = useRef('');
  const newPasswordRef = useRef('');
  const oldPinRef = useRef('');
  const newPinRef = useRef('');

  useEffect(() => {
    fetchTransactionHistory();
    fetchUserBalance();
  }, []);

  const fetchUserBalance = async () => {
    try {
      const response = await axiosInstance.get(`/accbalance/getAccBalance`);
      if (response.data.success) {
        const UsdBalance = response.data.data.accountBalance;
        let formattedBalance;
        if (user.currency !== "USD") {
          const ExchangeResponse = await axios.get(`${CURRENCY_API_URL}/USD/${user.currency}/${UsdBalance}`);
          const currencyConversionRate = await axios.get(`${CURRENCY_API_URL}/USD/${user.currency}`);
          dispatch(addConversionRate(currencyConversionRate.data.conversion_rate));

          const userCurrBalance = ExchangeResponse.data.conversion_result;
          formattedBalance = userCurrBalance.toFixed(2);
          dispatch(addBalance(Number(formattedBalance)));
        } else {
          formattedBalance = UsdBalance.toFixed(2);
          dispatch(addBalance(Number(formattedBalance)));
        }
      }
    } catch (err) {
      console.error("Error while fetching balance data:", err);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axiosInstance.get(`/transactionHistory/getTransactionDetails`);
      if (response.data.success) {
        const transactionsData = response.data.message;
        dispatch(addTransactionHistory(transactionsData));
      }
    } catch (err) {
      console.error("Error while fetching TransactionHistory data:", err);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSubmit();
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    try {
      const updatedDetails = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
      };
      const response = await axiosInstance.post(`/users/update-account`, updatedDetails);
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to update user details');
      }

      setSuccessMessage({ ...successMessage, details: 'User details updated successfully' });
      setErrors({});
    } catch (error) {
      setErrors({ ...errors, details: error.message });
      setSuccessMessage({});
    }
  };

  const handlePasswordChange = async () => {
    try {
      const oldPassword = oldPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;
      if (!validatePassword(newPassword)) {
        throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.');
      }

      const passwordDetails = {
        oldPassword,
        newPassword
      };
      const response = await axiosInstance.post(`/users/change-password`, passwordDetails);
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to update Password');
      }

      setSuccessMessage({ ...successMessage, password: 'Password changed successfully' });
      setErrors({});
    } catch (error) {
      setErrors({ ...errors, password: error.message });
      setSuccessMessage({});
    }
  };

  const handlePinChange = async () => {
    try {
      const pinDetails = {
        oldPin: oldPinRef.current.value,
        newPin: newPinRef.current.value
      };
      const response = await axiosInstance.post(`/users/change-pin`, pinDetails);
      const result = response.data;
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update Pin');
      }

      setSuccessMessage({ ...successMessage, pin: 'PIN changed successfully' });
      setErrors({});
    } catch (error) {
      setErrors({ ...errors, pin: error.message });
      setSuccessMessage({});
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="bg-blue-600 w-9/12 mx-auto p-6 rounded-lg shadow-md mt-16">
        <h1 className="text-3xl font-bold mb-4 text-center">{lang[langKey].Profile}</h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700">{lang[langKey].username}</label>
              <input
                type="text"
                name="username"
                defaultValue={userDetails?.username}
                ref={usernameRef}
                readOnly={!isEditing}
                className={`mt-1 p-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded w-full`}
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">{lang[langKey].Email}</label>
              <input
                type="email"
                name="email"
                defaultValue={userDetails.email}
                ref={emailRef}
                readOnly={!isEditing}
                className={`mt-1 p-2 border rounded w-full`}
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">{lang[langKey].userId}</label>
              <input
                type="text"
                name="userId"
                value={userDetails.userId}
                readOnly
                className="mt-1 p-2 border border-transparent bg-gray-400 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">{lang[langKey].Balance}</label>
              <input
                type="text"
                name="balance"
                value={userDetails.balance}
                readOnly
                className={`mt-1 p-2 border rounded w-full bg-gray-400 pointer-events-none`}
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">{lang[langKey].Currency}</label>
              <input
                type="text"
                name="currency"
                value={userDetails.currency}
                readOnly
                className="mt-1 p-2 border border-transparent bg-gray-400 rounded w-full"
              />
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {errors.details && (
            <p className="mt-2 text-red-500">{errors.details}</p>
          )}
          {successMessage.details && (
            <p className="mt-2 text-green-500">{successMessage.details}</p>
          )}
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{lang[langKey].Security}</h2>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
          {lang[langKey].ChangePassword}
          </button>
          {showPasswordForm && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <label className="block text-gray-700">{lang[langKey].OldPassword}</label>
              <input
                type="password"
                ref={oldPasswordRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <label className="block text-gray-700 mt-4">{lang[langKey].NewPassword}</label>
              <input
                type="password"
                ref={newPasswordRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <button
                onClick={handlePasswordChange}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
              {lang[langKey].Submit}
              </button>
              {errors.password && (
                <p className="mt-2 text-red-500">{errors.password}</p>
              )}
              {successMessage.password && (
                <p className="mt-2 text-green-500">{successMessage.password}</p>
              )}
            </div>
          )}
          <button
            onClick={() => setShowPinForm(!showPinForm)}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
          {lang[langKey].ChangePin}
          </button>
          {showPinForm && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <label className="block text-gray-700">{lang[langKey].OldPin}</label>
              <input
                type="password"
                ref={oldPinRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <label className="block text-gray-700 mt-4">{lang[langKey].NewPin}</label>
              <input
                type="password"
                ref={newPinRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <button
                onClick={handlePinChange}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
              {lang[langKey].Submit}
              </button>
              {errors.pin && (
                <p className="mt-2 text-red-500">{errors.pin}</p>
              )}
              {successMessage.pin && (
                <p className="mt-2 text-green-500">{successMessage.pin}</p>
              )}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">{lang[langKey].TransactionHistory}</h2>
          <div className='ml-14 w-11/12'>
            {transactions.map((transaction) => (
              <Transactions key={transaction._id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
