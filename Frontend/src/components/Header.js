import React, { useEffect } from 'react'
import { LOGO_URL } from '../utils/constants'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/redux/userSlice';
import UseOnlineStatus from '../hooks/useOnlineStatus';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector( (store) => store.user );
  const OnlineStatus = UseOnlineStatus();
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
    <div className='absolute bg-blue-600 w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <div className="h-28" >
        <img className='w-44 h-30 ml-0' 
        src={LOGO_URL} alt='LOGO_IMG' />
      </div>
      { user && 
          <div className="flex items-center text-white" >
          <ul className="flex p-4 m-4 font-bold text-lg" >
              <li className="px-5">Online Status: { OnlineStatus ? "✔️":"❌" }</li>
              <li className="px-5"><Link to="/Home">Home</Link></li>
              <li className="px-5"><Link to="/AboutUs" >About Us</Link></li>
              {/* <li className="px-5"><Link to="/grocery">Grocery</Link></li> */}
              <button onClick={handleSignout} className='ml-6 font-bold text-white hover:underline'>
              { user?.displayName }
              </button>
          </ul>
          </div>
      }
    </div>
  )
}

export default Header