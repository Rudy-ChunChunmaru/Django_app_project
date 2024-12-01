import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  MoonIcon,
  SunIcon
} from "@heroicons/react/24/solid";

import {THEME} from "../logic/constants";
import NavbarMenu from "./navbar-menu";
import {VariableApps} from "../data/variable-apps";
import LoadApps,{ loadAppsType } from "../AppLoad";

type navbarType = {
  dataApps:loadAppsType,
  setDataApps:(value:loadAppsType)=>void,
}

const Navbar = ({dataApps,setDataApps}:navbarType) => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  useEffect(() => {
    loginStatusCek();
  }, [dataApps,loginStatus]);

  const loginStatusCek = async () => {
    const token = dataApps.access;
    if (token != null && token != '') setLoginStatus(true);
    else setLoginStatus(false);
  };

  const User = ({userToken}:{userToken:string}) => {
    let first_name;
    let last_name;
    if (userToken != null && userToken != '') {
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
        className='rounded-md px-2 transition-colors border-2
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
        className='rounded-md px-2 transition-colors border-2
        border-gray-300 bg-gray-200 hover:bg-gray-300 
        dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500' 
        onClick={() => navigate("/logout")}
      >
        <strong>Logout</strong>
      </button>
    );
  };

  const LoadMenu = ({userToken}:{userToken:string}) => {
    if (userToken != null && userToken != '') {
      const userData: any = jwtDecode(userToken);
      if(userData?.menus && Array.isArray(userData.menus))
        return (
          <div className="flex w-full border-t-2">
            <NavbarMenu idMenus={[...userData.menus.map((val:any) => val?.id && val.id)]} />
          </div>
        );
      else
        return (
          <div className="flex w-full border-t-2">
            <div>No Menu</div>
          </div>
        )
    }else
      return (
        <div className="flex w-full border-t-2">
          <div>No Menu</div>
        </div>
      )
    
    
  };

  return (
    <div className='flex w-[100%] flex-col px-5 border-b-2
          border-gray-300 bg-gray-100  
          dark:border-gray-500 dark:bg-gray-700'>
      <div className="flex w-full justify-between px-3 py-1">
        <div 
          className='group my-auto flex h-fit w-fit gap-2 px-1 rounded-md transition 
          border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 
          dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500'
          onClick={()=>{loginStatus ? navigate("/apps") : navigate("/") }}>
          <div className='m-x-auto my-auto w-fit p-1'>
            <img
              className="mx-auto my-auto w-[3rem]"
              src={VariableApps.LogoApps}
              alt={VariableApps.LogoApps}
            />
          </div>
          <div className='border-x-[1px] border-black' ></div>
          <div className="my-auto w-[100%] group-hover:border-b-2 border-gray-500 dark:border-gray-300">
            <strong>{VariableApps.TitleApps}</strong>
          </div>
        </div>
        
        <div className="flex flex-row justify-between min-w-[20%] max-w-fit">
          <div className="flex w-full  flex-col px-2">
            {loginStatus && <User userToken={dataApps.user} />}
            {loginStatus ? <Logout /> : <Login />}
          </div>
          <div className='w-fit h-full'>
            <div 
              className='rounded-md transition-colors h-fit py-1 border-2
              border-gray-300 bg-gray-200 hover:bg-gray-300 
              dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500'
              onClick={()=>{
                localStorage.setItem(THEME,dataApps.theme == 'dark' ? 'light' : 'dark')
                setDataApps(LoadApps())
              }}
            >
              <div className='w-8 px-1 justify-self-center'>
                {
                  dataApps.theme == 'dark' ? 
                  <SunIcon className="fill-current" /> : <MoonIcon className="fill-current" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{loginStatus ? <LoadMenu userToken={dataApps.user} />: <></>}</div>
    </div>
  );
};

export default Navbar;
