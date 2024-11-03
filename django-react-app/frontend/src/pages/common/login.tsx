import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import api from "../../logic/api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TOKEN } from "../../logic/constants";
import { RotateLoader } from "react-spinners";

type Props = {};

const Login = ({}: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");

  const navigate = useNavigate();
  const loginAction = async (e: any) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      try {
        setLoading(true);
        const res = await api.post("api/web/auth/", { username, password });
        if (res) {
          const dataUser: any = jwtDecode(res?.data?.data);
          // console.info(dataUser);
          if (dataUser?.status) localStorage.setItem(USER_TOKEN, res.data.data);
          localStorage.setItem(ACCESS_TOKEN, res.data.token.access);
          // console.info(res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.token.refresh);
          // console.info(res.data.refresh);
          navigate("/apps");
        } else {
          navigate("/login");
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          setmessage(error.response.data.detail);
        }
        console.info(error);
      } finally {
        setLoading(false);
      }
    } else setmessage("username and password cant be empty !!!");
  };

  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-slate-500">
      <form
        onSubmit={loginAction}
        className="flex w-[80%] min-w-80 flex-col items-center justify-center gap-5 rounded-xl border-4 border-black bg-slate-200 px-3 py-5 sm:w-[45%]"
      >
        <div className="flex w-full justify-center">
          <h1>
            <strong>
              <u>LOGIN</u>
            </strong>
          </h1>
        </div>

        <div className="flex w-[70%] flex-col items-center justify-center gap-1">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full rounded-lg border-2 px-3 py-2 hover:border-2 hover:border-black"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg border-2 px-3 py-2 hover:border-2 hover:border-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          {message && (
            <div className="flex flex-row items-center justify-between gap-3 rounded-lg bg-red-500 px-3 py-2">
              <div>{message}</div>
              <div
                className="rounded-lg border-2 px-1 hover:px-3"
                onClick={() => {
                  setmessage("");
                }}
              >
                x
              </div>
            </div>
          )}
          {loading && (
            <div className="">
              <RotateLoader />
              <RotateLoader />
            </div>
          )}
          {!loading && (
            <button
              type="submit"
              className="w-[60%] rounded-lg border-2 border-black bg-blue-500 py-2 transition-all hover:w-full hover:bg-white"
            >
              LOGIN
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
