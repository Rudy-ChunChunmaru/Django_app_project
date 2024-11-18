import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoadApps, { loadAppsType } from "../../AppLoad";
import {THEME} from "../../logic/constants"

type Props = {
  setDataApps:(value:loadAppsType)=>void
};

const Logout = ({setDataApps}:Props) => {
  useEffect(() => {
    const theme = localStorage.getItem(THEME)
    localStorage.clear();
    localStorage.setItem(THEME,theme ? theme : '')
    setDataApps(LoadApps())
  }, []);

  return <Navigate to={"/"} />;
};

export default Logout;
