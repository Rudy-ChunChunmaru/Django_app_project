import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../logic/constants";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    loginStatusCek();
  }, []);

  const loginStatusCek = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token != null) setLoginStatus(true);
    else setLoginStatus(false);
  };

  const navigate = useNavigate();
  const Login = () => {
    return (
      <div
        className="rounded-sm bg-green-300 px-1 transition-colors hover:bg-green-500"
        onClick={() => navigate("login")}
      >
        <strong>Login</strong>
      </div>
    );
  };
  const Logout = () => {
    return (
      <div
        className="rounded-sm bg-red-300 px-1 transition-colors hover:bg-red-500"
        onClick={() => navigate("logout")}
      >
        <strong>Logout</strong>
      </div>
    );
  };

  const LoadMenu = () => {
    return (
      <div className="flex w-full border-t-2">
        <>load menu</>
      </div>
    );
  };

  return (
    <div className="mx-auto flex w-[98%] flex-col rounded-lg border-2">
      <div className="flex w-full justify-between py-1">
        <div className="my-auto p-1">
          <h1>APP NAME</h1>
        </div>
        <div className="flex w-[10%] flex-col px-2">
          {loginStatus && (
            <div className="rounded-sm bg-blue-300 px-1 transition-colors hover:bg-blue-500">
              username
            </div>
          )}
          {loginStatus ? <Logout /> : <Login />}
        </div>
      </div>
      <div>{loginStatus ? <LoadMenu /> : <></>}</div>
    </div>
  );
};

export default Navbar;
