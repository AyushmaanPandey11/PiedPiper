import { useEffect, useRef, useState } from 'react';
import {checkValidData} from "../utils/validate";
import Header from './Header';
import { BACKEND_URL, CurrencyPairs } from '../utils/constants';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { addUser } from '../utils/redux/userSlice';
import { useDispatch } from 'react-redux';
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const pin = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const currency = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleButtonClick = async () => {
    if ((email.current && password.current) 
          || (email.current && password.current && username.current && pin.current && currency.current)) 
    {
      const message = checkValidData(
        username.current ? username.current.value : "",
        email.current ? email.current.value : "",
        password.current ? password.current.value : "",
        isSignIn,
        pin.current ? pin.current.value : ""
      );
      setErrorMessage(message);
    }

    // Registration
    if(!isSignIn)
    {
      // making json
      const UserRegData = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        pin: pin.current.value,
        currency: currency.current.value 
      };
      try {
        const response = await axios.post(`${BACKEND_URL}/users/register`, UserRegData);
        const auth = response.data;
        if (auth.success) 
        {
          dispatch(addUser(auth.data));
          navigate("/browse");
        } 
        else 
        {
          setErrorMessage(auth.Message);
        }
      } catch (error) {
        console.error("Error while posting data:", error);
      }
    }
    else
    {
      const LoginData = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };
      try
      {
          const response = await axios.post(`${BACKEND_URL}/users/login`, LoginData);
          const auth = response.data;
          if(auth.success)
          {
            dispatch(addUser(auth.data));
            navigate("/browse");
          }
          else
          {
            setErrorMessage(auth.message);
          }
      }
      catch(err)
      {
        console.error("Error while posting data: ",err);
      }
    }
    
  };

  const ToggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className='bg-black absolute z-10'>
      <Header />
      <div className='absolute'>
        <img src="./BG.jpg" alt="bg_img" className='w-screen' />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 my-20 text-white bg-black mx-auto left-0 right-0 bg-opacity-75 rounded-md'>
        <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        { !isSignIn && <input ref={username} className='my-6 p-4 w-full bg-gray-600 ' type='text' placeholder='Enter Your Name' />}
        <input
          ref={email}
          className='my-4 p-4 w-full bg-gray-600 '
          type='text'
          placeholder='Enter Your Email Address'
        />
        <input
          ref={password}
          className='my-4 p-4 w-full bg-gray-600 '
          type='password'
          placeholder='Enter Password'
        />
        { !isSignIn && <input ref={pin} className='my-6 p-4 w-full bg-gray-600 ' type='password' placeholder='Enter Your Pin' />}
        { !isSignIn && <select ref={currency} className='px-4 w-full  font-bold h-12 bg-gray-600 border-none text-white'>
          {
            CurrencyPairs.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
          }
        </select>}
        <p className='text-red-700 font-bold py-2'>{errorMessage}</p>
        <button className='my-4 p-4 w-full bg-blue-700' onClick={HandleButtonClick}>{isSignIn ? "Sign In" : "Sign Up"}</button>
        <p className='my-2 p-2 cursor-pointer underline-offset-1' onClick={ToggleSignInForm}>
          {isSignIn ? "New to PiedPiper? Sign Up now!" : "Already a Member? Sign in now"}
        </p>
      </form>
    </div>
  )
}


export default Login