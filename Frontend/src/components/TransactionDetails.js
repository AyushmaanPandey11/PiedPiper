import React from 'react';
import { useSelector } from 'react-redux';

const TransactionDetails = ({ transaction }) => {
  const {sender, receiver,amount,reason,_id,createdAt} = transaction;
  const currency = useSelector((state) => state.currency);

  return (
    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transaction Successful</h2>
      <h2 className="text-xl font-bold mb-1">Details:</h2>
      <p><strong>Sender ID:</strong> {sender}</p>
      <p><strong>Receiver ID:</strong> {receiver}</p>
      <p><strong>Amount:</strong> {amount}</p>
      <p><strong>Currency:</strong> {currency}</p>
      <p><strong>Reason:</strong> {reason}</p>
      <p><strong>Transaction ID:</strong> {_id}</p>
      <p><strong>Time :</strong> {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default TransactionDetails;
