import React, { useEffect } from 'react'
import { LOGO_URL, SUPPORTED_LANG } from '../utils/constants'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, changeLanguage, removeUser } from '../utils/redux/userSlice';
import UseOnlineStatus from '../hooks/useOnlineStatus';
import lang from '../utils/languageConstants';


const Header = () => {
  const langKey = useSelector((store)=> store.user?.lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector( (store) => store.user );
  const OnlineStatus = UseOnlineStatus();

  const handleLangChange  = (e) => {
    dispatch(changeLanguage(e.target.value));
  }
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
        // navigate("/browse");
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
    <div className=' bg-blue-600 w-screen px-8 py-2 bg-gradient-to-b from-black  flex justify-between'>
      {/* <div className="h-28" >
        <img className='w-44 h-30 ml-0' 
        src={LOGO_URL} alt='LOGO_IMG' />
      </div> */}
      { user && 
          <div className="flex items-center text-white" >
          <ul className="flex p-4  font-bold text-lg" >
              <li className="px-5">{lang[langKey].Status}: { OnlineStatus ? "✔️":"❌" }</li>
              <li className="px-5"><Link to="/browse">{lang[langKey].Home}</Link></li>
              <li className="px-5"><Link to="/about">{lang[langKey].About}</Link></li>
              <li className="px-5 hover:underline"><Link to="/Profile" >{ user?.displayName }</Link></li>
          </ul>
          <button onClick={handleSignout} className='px-5 -ml-12  font-bold text-white hover:underline'>
              {lang[langKey].LogOut}
              </button>
          { user && <select className='px-5 -mt-0 font-bold h-10 bg-blue-900 border-none text-white' onChange={handleLangChange}  >
            {
              SUPPORTED_LANG.map( 
                lang => <option  key={lang.identifier} value={lang.identifier}>{lang.name}
                        </option>  )
            }
            </select>
          }
          </div>
      }
    </div>
  )
}

export default Header