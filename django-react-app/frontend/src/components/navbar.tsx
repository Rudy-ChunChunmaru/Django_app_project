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
    return <a onClick={() => navigate("login")}>Login</a>;
  };
  const Logout = () => {
    return <a onClick={() => navigate("logout")}>Logout</a>;
  };

  return (
    <div className="mx-auto flex w-[100%] flex-col rounded-lg border-2">
      <div className="flex w-full justify-between">
        <div className="my-auto">navbar</div>
        <div className="flex flex-col">
          <div>{loginStatus && "username"}</div>
          <div>{loginStatus ? <Logout /> : <Login />}</div>
        </div>
      </div>
      <div className="flex w-full border-2">menu</div>
    </div>
  );
};

export default Navbar;
