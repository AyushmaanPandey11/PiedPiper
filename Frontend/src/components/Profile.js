import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance } from '../utils/redux/userSlice';
import useAxios from '../hooks/useAxios';
import axios from 'axios';
import { CURRENCY_API_URL } from '../utils/constants';

const Profile = () => {
  const user = useSelector((store) => store?.user?.userDetail?.user);
  const fetchedBalance = useSelector((store) => store?.user?.balance);
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

  const [transactions, setTransactions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPinForm, setShowPinForm] = useState(false);

  const usernameRef = useRef('');
  const emailRef = useRef('');
  const balanceRef = useRef('');
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
        const ExchangeResponse = await axios.get(`${CURRENCY_API_URL}/USD/${user.currency}/${UsdBalance}`);
        const userCurrBalance = ExchangeResponse.data.conversion_result;
        dispatch(addBalance(userCurrBalance));
      }
    } catch (err) {
      console.error("Error while fetching balance data:", err);
    }
  };

  const fetchTransactionHistory = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    setTransactions(data);
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
        userId: userDetails.userId,
        balance: balanceRef.current.value,
        currency: userDetails.currency // Keep the currency as it is from the userDetails
      };

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDetails)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user details');
      }
      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message });
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

      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordDetails)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }
      setErrors({});
      setShowPasswordForm(false);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handlePinChange = async () => {
    try {
      const pinDetails = {
        oldPin: oldPinRef.current.value,
        newPin: newPinRef.current.value
      };

      const response = await fetch('/api/change-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pinDetails)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to change PIN');
      }
      setErrors({});
      setShowPinForm(false);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="bg-blue-600 w-9/12 mx-auto p-6 rounded-lg shadow-md mt-16">
        <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700">Username</label>
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
              <label className="block font-bold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={userDetails.email}
                ref={emailRef}
                readOnly={!isEditing}
                className={`mt-1 p-2 border  rounded w-full`}
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">User ID</label>
              <input
                type="text"
                name="userId"
                value={userDetails.userId}
                readOnly
                className="mt-1 p-2 border border-transparent bg-gray-400 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Balance</label>
              <input
                type="text"
                name="balance"
                value={userDetails.balance}
                readOnly
                className={`mt-1 p-2 border  rounded w-full bg-gray-400 pointer-events-none`}
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">Currency</label>
              <input
                type="text"
                name="currency"
                value={userDetails.currency}
                readOnly
                className="mt-1 p-2 border border-transparent bg-gray-400  rounded w-full"
              />
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {errors.submit && (
            <p className="mt-2 text-red-500">{errors.submit}</p>
          )}
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Change Password
          </button>
          {showPasswordForm && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <label className="block text-gray-700">Old Password</label>
              <input
                type="password"
                ref={oldPasswordRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <label className="block text-gray-700 mt-4">New Password</label>
              <input
                type="password"
                ref={newPasswordRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <button
                onClick={handlePasswordChange}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          )}
          <button
            onClick={() => setShowPinForm(!showPinForm)}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Change PIN
          </button>
          {showPinForm && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <label className="block text-gray-700">Old PIN</label>
              <input
                type="password"
                ref={oldPinRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <label className="block text-gray-700 mt-4">New PIN</label>
              <input
                type="password"
                ref={newPinRef}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <button
                onClick={handlePinChange}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index} className="mb-2">
                {transaction.date}: {transaction.description} - {transaction.amount} {transaction.currency}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
