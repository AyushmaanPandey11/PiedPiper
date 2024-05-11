// useCurrencyConversion.js
import { useEffect, useState } from 'react'; 
import axios from "axios";
import { CURRENCY_API_URL } from '../utils/constants';

const useCurrencyConversion = ({ fromCurrency, toCurrency }) => {
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        console.log(`${CURRENCY_API_URL}/${fromCurrency}/${toCurrency}`);
        const response = await axios.get(
          `${CURRENCY_API_URL}/${fromCurrency}/${toCurrency}`
        );
        
        const result = response?.data?.conversion_rate;
        if (result) {
          setConversionRate(result);
        } else {
          console.error("Error: Conversion rate not found in API response");
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    if (fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency]);

  return conversionRate;
};

export default useCurrencyConversion;
