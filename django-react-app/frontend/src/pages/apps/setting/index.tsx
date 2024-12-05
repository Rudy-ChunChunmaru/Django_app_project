import { Outlet } from "react-router-dom";

const Setting = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 w-full">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};


export default Setting;
