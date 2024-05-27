import { useRef, useState } from 'react';
import { checkValidData } from "../utils/validate";
import { BACKEND_URL, CurrencyPairs, SUPPORTED_LANG } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, changeLanguage } from '../utils/redux/siteSlice';
import Header from './Header';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const pin = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const currency = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.site?.Language);

  const HandleButtonClick = async () => {
    let ResponseMessage;
    if (((email.current && password.current) || (username.current && password.current)) 
          || (email.current && password.current && username.current && pin.current && currency.current)) 
    {
      ResponseMessage = checkValidData(
        username.current ? username.current.value : "",
        email.current ? email.current.value : "",
        password.current ? password.current.value : "",
        isSignIn,
        pin.current ? pin.current.value : ""
      );
      setErrorMessage(ResponseMessage.message);
    }

    if (ResponseMessage?.isValid) {
      setLoading(true); // Start loading
      if (!isSignIn) {
        // Registration
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
          if (auth.success) {
            dispatch(changeStatus());
            dispatch(addUser(auth.data));
            navigate("/browse");
          } else {
            setErrorMessage(auth.Message);
          }
        } catch (error) {
          console.error("Error while posting data:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      } else {
        // Sign In
        const LoginData = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        };
        try {
          const response = await axios.post(`${BACKEND_URL}/users/login`, LoginData);
          const auth = response.data;
          if (auth?.success) {
            dispatch(changeStatus());
            dispatch(addUser(auth.data));
            navigate("/browse");
          } else {
            setErrorMessage(auth.message);
          }
        } catch (err) {
          console.error("Error while posting data:", err);
        } finally {
          setLoading(false); 
        }
      }
    }
  };

  const ToggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='relative min-h-screen'>
      <Header />
      <div className='absolute inset-0 z-0 '>
        <img src="./BG.jpg" alt="bg_img" className='w-full h-full object-cover' />
      </div>
      <div className='relative z-10'>
        <div className='flex justify-between items-start p-4'>
          <img className='w-30 h-28 ml-4 -mt-24' src="./LOGO.jpg" alt='LOGO_IMG' />
          <select className='px-5 -mt-16 mr-4 font-bold h-10 bg-blue-900 border-none text-white' onChange={handleLangChange} value={langKey}>
            {
              SUPPORTED_LANG.map(lang => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))
            }
          </select>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='w-3/12 p-12 mt-5 text-white bg-black bg-opacity-75 mx-auto rounded-md'>
          <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
          <input ref={username} className='my-6 p-4 w-full bg-gray-600 ' type='text' placeholder='Enter Your username' />
          {isSignIn && <p className='ml-[45%] font-bold'>Or</p>}
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
          {!isSignIn && <input ref={pin} className='my-6 p-4 w-full bg-gray-600 ' type='password' placeholder='Enter Your Pin' />}
          {!isSignIn && <select ref={currency} className='px-4 w-full font-bold h-12 bg-gray-600 border-none text-white'>
            {
              CurrencyPairs.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
            }
          </select>}
          <p className='text-red-700 font-bold py-2'>{errorMessage}</p>
          <button className='my-4 p-4 w-full bg-blue-700' onClick={HandleButtonClick} disabled={loading}>
            {loading ? <span className="loader"></span> : (isSignIn ? "Sign In" : "Sign Up")}
          </button>
          <p className='my-2 p-2 cursor-pointer underline-offset-1' onClick={ToggleSignInForm}>
            {isSignIn ? "New to PiedPiper? Sign Up now!" : "Already a Member? Sign in now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
