import { useEffect, useState } from "react";
import { ACCESS_TOKEN, USER_TOKEN } from "../logic/constants";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "./navbar-menu";
import { jwtDecode } from "jwt-decode";

import {VariableApps} from "../data/variable-apps";

import {
  MoonIcon,
  SunIcon
} from "@heroicons/react/24/solid";

type navbarType = {
  dataApps:any,
  setDataApps:any,
}

const Navbar = ({dataApps,setDataApps}:navbarType) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  useEffect(() => {
    loginStatusCek();
  }, [dataApps]);

  const loginStatusCek = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token != null) {
      setLoginStatus(true);
    } else setLoginStatus(false);
  };

  const navigate = useNavigate();

  const User = () => {
    const userToken: string | null = localStorage.getItem(USER_TOKEN);
    let first_name;
    let last_name;
    if (userToken != null) {
      const userData: any = jwtDecode(userToken);
      userData?.user &&
        ((first_name = userData.user?.first_name) ||
          (last_name = userData.user?.last_name));
    }

    return (
      <div 
        className='rounded-md px-2 transition-colors border-2
        border-gray-300 bg-gray-200 hover:bg-gray-300 
        dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500'
      >
        {first_name || last_name ? (
          <div className="flex flex-row justify-start gap-2">
            {first_name && <div>{first_name}</div>}
            {last_name && <div>{last_name}</div>}
          </div>
        ) : (
          <div className="flex flex-col justify-start gap-2">
            user dont have first name and last name
          </div>
        )}
      </div>
    );
  };

  const Login = () => {
    return (
      <div
        className='rounded-sm px-2 transition-colors border-2
        border-gray-300 bg-gray-200 hover:bg-gray-300 
        dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500' 
        onClick={() => navigate("/login")}
      >
        <strong>Login</strong>
      </div>
    );
  };

  const Logout = () => {
    return (
      <button
        className='rounded-sm px-2 transition-colors border-2
        border-gray-300 bg-gray-200 hover:bg-gray-300 
        dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500' 
        onClick={() => navigate("/logout")}
      >
        <strong>Logout</strong>
      </button>
    );
  };

  const LoadMenu = () => {
    return (
      <div className="flex w-full border-t-2">
        <NavbarMenu />
      </div>
    );
  };

  return (
    <div className='flex w-[100%] flex-col px-5 border-b-2
          border-gray-300 bg-gray-100  
          dark:border-gray-500 dark:bg-gray-700'>
      <div className="flex w-full justify-between px-3 py-2">
        <div 
          className='my-auto flex h-fit w-fit gap-2 px-1 rounded-md transition 
          border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 
          dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500'
          onClick={()=>navigate("/")}>
          <div className='m-x-auto my-auto w-fit p-1'>
            <img
              className="mx-auto my-auto w-[3rem]"
              src={VariableApps.LogoApps}
              alt={VariableApps.LogoApps}
            />
          </div>
          <div className='border-x-[1px] border-black' ></div>
          <div className="my-auto w-[100%] hover:border-b-2 border-black">
            <strong>{VariableApps.TitleApps}</strong>
          </div>
        </div>
        
        <div className="flex flex-row justify-between min-w-[20%] max-w-fit">
          <div className="flex w-full  flex-col px-2">
            {loginStatus && <User />}
            {loginStatus ? <Logout /> : <Login />}
          </div>
          <div>
            <div 
              className='rounded-sm transition-colors h-full py-auto border-2
              border-gray-300 bg-gray-200 hover:bg-gray-300 
              dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500'
              onClick={()=>{
                setDataApps({...dataApps,theme:dataApps.theme == 'dark' ? 'light' : 'dark'})
              }}
            >
              <div className='w-8 px-1 h-full'>
                {
                  dataApps.theme == 'dark' ? 
                  <MoonIcon className="fill-current" /> : <SunIcon className="fill-current" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{loginStatus ? <LoadMenu /> : <></>}</div>
    </div>
  );
};

export default Navbar;
