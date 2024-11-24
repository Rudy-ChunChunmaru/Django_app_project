import { Outlet } from "react-router-dom";

const Apps = () => {
  return (
    
    <div className="w-full h-full
      bg-gray-300
      dark:bg-gray-500
    ">
      <Outlet />
    </div>
    
  );
};

export default Apps;
