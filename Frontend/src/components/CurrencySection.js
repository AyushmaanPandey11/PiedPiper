import React from 'react';

const CurrencySection = () => {
  // Function to handle the onchange event of the select element
  const updateCurrencyTable = (event) => {
    // Add your logic to handle currency updates here
    console.log('Selected currency:', event.target.value);
  };

  return (
    <div className="mt-30">
      <h2 className="text-center">Currency Updates</h2>
      <div className="currency-section mt-4 ml-auto px-4 flex flex-col justify-center w-1/2 bg-blue-600 text-white rounded-full cursor-pointer">
        <select id="currency-selector" onChange={updateCurrencyTable} className="border-none outline-none text-lg font-semibold">
          {/* Add options for currency selection */}
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more options as needed */}
        </select>
        <div className="currency-info mt-4">
          {/* Currency information will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default CurrencySection;
