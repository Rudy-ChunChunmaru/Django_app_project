import { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import api from "../logic/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../logic/constants";

type ProtectedRouteType = {
  children: JSX.Element;
};

const refreshToken = async () => {
  let status = true
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) {
    status= false;
  }else{
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
      } else{
        status= false;
      }
    } catch (error) {
      console.error(error);
      status= false;
    }
  }
  return status
};


export const auth = async () => {
  let status = true
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    status = false;
  }else{
    const decode: any = jwtDecode(token);
    const tokenExpiration = decode.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now){
      if(await refreshToken()) auth();
      else status = false;
    } 
  }
  return status
};

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  useLayoutEffect(() => {
    auth().then((data)=>setIsAuthorized(data));
  }, []);

  return isAuthorized ? children : <Navigate to={"/logout"} replace />;
};

export default ProtectedRoute;
