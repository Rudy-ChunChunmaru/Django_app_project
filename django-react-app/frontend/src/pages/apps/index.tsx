import { Outlet } from "react-router-dom";

const Apps = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Apps;
