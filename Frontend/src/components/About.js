import React from 'react'
import Header from "./Header";
const About = () => {
  return (
    <div >
      <Header />
      <div className="mt-30">
        <h2 className="text-center font-bold text-5xl mt-10">About</h2>
        <div className="ml-[320px] mt-4 px-7  flex flex-col justify-center w-8/12 h-[600px] bg-blue-600 text-white text-2xl rounded-2xl cursor-pointer">
          <div>
          The objective of the "Forex Payment Interface" project is to create a seamless and efficient payment platform that 
          eliminates the complexities of foreign exchange for tourists and international transactions. 
          The vision is to provide a user-friendly solution that allows tourists to make payments in 
          their home currency while enabling merchants to receive payments in their preferred currency 
          without the need for manual currency conversions.
          </div>
          <div className='my-10'>
          The Forex Payment Interface is designed to streamline international transactions, making it convenient for both tourists and merchants. 
          It leverages real-time exchange rates to offer customers the option to pay in their own currency, providing transparency 
          and eliminating the need for foreign exchange calculations. 
          This project aims to simplify cross-border transactions and enhance the shopping experience for tourists.
          </div>
        </div>
        <div className="flex flex-col mt-4">
        
        </div>
      </div>
    </div>
  )
};

export default About;