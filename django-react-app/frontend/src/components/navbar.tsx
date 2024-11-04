import { useEffect, useState } from "react";
import { ACCESS_TOKEN, USER_TOKEN } from "../logic/constants";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "./navbar-menu";
import { jwtDecode } from "jwt-decode";

import vite from "../asset/photo/vite.svg";

const Navbar = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  useEffect(() => {
    loginStatusCek();
  }, []);

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
      <div className="rounded-sm bg-blue-300 px-1 transition-colors hover:bg-blue-500">
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
        className="rounded-sm bg-green-300 px-1 transition-colors hover:bg-green-500"
        onClick={() => navigate("/login")}
      >
        <strong>Login</strong>
      </div>
    );
  };

  const Logout = () => {
    return (
      <button
        className="rounded-sm bg-red-300 px-1 transition-colors hover:bg-red-500"
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
    <div className="mx-auto flex w-[100%] flex-col border-b-2">
      <div className="flex w-full justify-between px-3 py-1">
        <div className="my-auto flex h-fit w-fit gap-4 p-1">
          <img
            className="mx-auto my-auto h-[60%] w-[60%]"
            src={vite}
            alt={vite}
          />
          <div className="w-[100%]">APP NAME</div>
        </div>
        <div className="flex min-w-[10%] max-w-fit flex-col px-2">
          {loginStatus && <User />}
          {loginStatus ? <Logout /> : <Login />}
        </div>
      </div>
      <div>{loginStatus ? <LoadMenu /> : <></>}</div>
    </div>
  );
};

export default Navbar;
