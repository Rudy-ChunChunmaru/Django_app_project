import { Outlet } from "react-router-dom";

const Setting = () => {
  return (
    <div id="setting" className="flex flex-col items-center justify-center gap-1 w-full">
        <Outlet />
    </div>
  );
};


export default Setting;
