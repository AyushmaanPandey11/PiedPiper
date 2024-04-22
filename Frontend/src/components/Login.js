import React, { useRef, useState } from 'react';
import { BG_URL } from '../utils/constants';
import {checkValidData} from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth} from "../utils/firebase";
import Header from './Header';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn,setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const HandleButtonClick = () => {
    if ((email.current && password.current) || (email.current && password.current && name.current)) {
        const message = checkValidData(
        name.current ? name.current.value : "",
        email.current ? email.current.value : "",
        password.current ? password.current.value : "",
        isSignIn
      );
      setErrorMessage(message);
      if(message) return;
    } 
    if(!isSignIn)
    {
        // Registeration
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value 
        }).then(() => {
          const {uid, displayName, email} = auth.currentUser;
        dispatch(addUser(
          {
            uid:uid,
            displayName: displayName,
            email:email,
          }));
        }).catch((error) => {
          setErrorMessage(error.message);
        });
        
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
        setErrorMessage("Account with this email already exists, Try different one!" + errorCode +"-"+ errorMessage);
      });
    }
    else
    {
      // SignIn Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
        setErrorMessage("No Accout Exists With given Email or password. Try Again or SignUp." + errorCode +"-"+ errorMessage);
      });
    }
  };
  const ToggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className='bg-black' >
        <Header/>
        <div className='absolute '>
            <img src={BG_URL} 
                alt="bg_img" className='w-screen'/>
      </div>
      <form 
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 my-64 text-white bg-black mx-auto left-0 right-0 bg-opacity-75 rounded-md'  >
          <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
          { !isSignIn && <input ref={name} className='my-6 p-4 w-full bg-gray-600 ' type='text' placeholder='Enter Your Name'></input>}
          <input 
            ref={email}
            className='my-4 p-4 w-full bg-gray-600 ' type='text' placeholder='Enter Your Email Address'>
            </input>
          <input 
            ref={password}
            className='my-4 p-4 w-full bg-gray-600 ' type='password' placeholder='Enter Password'>
            </input>
            <p className='text-red-700 font-bold py-2'>{errorMessage}</p>
          <button className='my-4 p-4 w-full bg-blue-700' onClick={HandleButtonClick} >{isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p className='my-2 p-2 cursor-pointer underline-offset-1' onClick={ToggleSignInForm}>
            {isSignIn ? 
              "New to PiedPiper? Sign Up now!" 
              : "Already a Member? Sign in now"}
          </p>
      </form>
    </div>
  )
}

export default Login