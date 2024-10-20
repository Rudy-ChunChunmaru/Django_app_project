import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const Log = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Log;
