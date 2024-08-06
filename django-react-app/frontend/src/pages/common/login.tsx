import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../logic/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../logic/constants";

type Props = {};

const Login = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginAction = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post("api/token/", { username, password });
      if (res) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        // console.info(res.data.access);

        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        // console.info(res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        alert(error.response.data.detail);
      }
      console.info(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed flex h-full w-full items-center justify-center">
      <form
        onSubmit={loginAction}
        className="flex w-[40%] flex-col items-center justify-center gap-2 rounded-xl border-4 border-black bg-slate-200 px-5 py-3"
      >
        <div className="flex w-full justify-center">
          <h1>
            <strong>
              <u>LOGIN</u>
            </strong>
          </h1>
        </div>
        <br></br>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className="w-full rounded-lg border-2 p-1"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="w-full rounded-lg border-2 p-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button
          type="submit"
          className="w-full rounded-lg border-2 border-black bg-blue-500 transition-all hover:bg-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
