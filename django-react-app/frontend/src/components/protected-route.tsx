import { useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import api from "../logic/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../logic/constants";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decode: any = jwtDecode(token);
    // console.log(decode);
    const tokenExpiration = decode.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) await refreshToken();
    else setIsAuthorized(true);
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthorized(false);
    }
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else setIsAuthorized(false);
    } catch (error) {
      // console.error(error);
      setIsAuthorized(false);
    }
  };

  return isAuthorized ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
