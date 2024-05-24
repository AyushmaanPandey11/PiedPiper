import {  SUPPORTED_LANG } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  changeLanguage } from '../utils/redux/userSlice';
import UseOnlineStatus from '../hooks/useOnlineStatus';
import lang from '../utils/languageConstants';
import {removeUser} from "../utils/redux/userSlice";

const Header = () => {
  const langKey = useSelector((store)=> store.user?.lang);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector( (store) => store.user?.userDetail );
  const OnlineStatus = UseOnlineStatus();
  const handleLangChange  = (e) => {
    dispatch(changeLanguage(e.target.value));
  }
  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className=' bg-blue-600 w-screen px-8  bg-gradient-to-b from-black  flex justify-between'>
      <div className="h-28" >
        <img className='w-30 h-full  ' 
        src="./LOGO.jpg" alt='LOGO_IMG' />
      </div>
      { user && 
          <div className="flex items-center text-white" >
          <ul className="flex p-4  font-bold text-lg" >
              <li className="px-5">{lang[langKey].Status}: { OnlineStatus ? "✔️":"❌" }</li>
              <li className="px-5"><Link to="/browse">{lang[langKey].Home}</Link></li>
              <li className="px-5"><Link to="/about">{lang[langKey].About}</Link></li>
              <li className="px-5"><Link to="/profile">{lang[langKey].Profile}</Link></li>
              <li className="px-5"><Link to="/pay">{lang[langKey].Pay}</Link></li>
              <li className="px-5 hover:underline"><Link to="/Profile" >{ user?.displayName }</Link></li>
          </ul>
          <button  onClick={handleLogout} className='px-5 -ml-12  font-bold text-white hover:underline'>
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