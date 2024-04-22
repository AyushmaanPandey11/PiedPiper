import React, { useEffect } from 'react'
import { LOGO_URL } from '../utils/constants'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/redux/userSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // const handleLangChange  = (e) => {
  //   dispatch(changeLanguage(e.target.value));
  // }

  const handleSignout = () => {
    signOut(auth)
    .then(() => {
    })
    .catch((error) => {
      navigate("/error");
    });
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const {uid, displayName, email} = user;
        dispatch(addUser(
          {
            uid:uid,
            displayName: displayName,
            email:email,
          }));
        navigate("/browse");
      } else {
        //Sign out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [navigate,dispatch]);

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44 h-30 ml-0' 
      src={LOGO_URL} alt='LOGO_IMG' />
      {/* { user && (
          <div className='flex p-2 px-7' > 
            { showGptSearch && <select className='p-2 mx-4 mt-7 h-12 bg-gray-800 text-white' onChange={handleLangChange}  >
              {
                SUPPORTED_LANG.map( 
                  lang => <option  key={lang.identifier} value={lang.identifier}>{lang.name}
                          </option>  )
              }
              </select>
            }
            <button 
              className='py-2 mx-2 my-7 bg-purple-800 text-white rounded-lg w-28 '
              onClick={handleToggleGpt} >
            {
              showGptSearch ? "Home" : "GPT Search" 
            }
            </button>
            <h2 className='mt-10 mx-7 font-bold text-white'>{user?.displayName}</h2>
            <img alt='userIcon' src = {user?.photoURL} className='w-12 h-12 mt-7' />
            <button  onClick={handleSignout} className='ml-6  font-bold text-white hover:underline' >
              Sign Out
            </button>
          </div>
        )} */}
    </div>
  )
}

export default Header