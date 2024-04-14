import {LOGO_URL} from "../utils/constants";
const Header = () => {
  return (
    <div className="flex justify-between shadow-xl  md-15">
            <div className="h-25">
                 <img className=" w-40 pl-5 bg-transparent" 
                src = {LOGO_URL} alt="logo Not Coming"/>
            </div>
            <div className="flex items-center" >
                <ul className="flex p-4 m-4 font-bold text-lg" >
                    <li className="px-5">HOME</li>
                    <li className="px-5">ABOUT US</li>
                    <li className="px-5">PERSONAL</li>
                    <button className="px-5">LOGIN</button>
                    <button className="px-5">SIGN UP</button>
                </ul>
            </div>
        </div>
  );
}

export default Header;
