import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Apps = () => {
 
  const HeaderView = ()=>
  {
    const location=useLocation()
    if(location.pathname.split('/').length - 1 > 1)
      return <div className="w-full text-sm px-5 border-b-2 
        bg-gray-100  border-gray-300
        dark:bg-gray-700 dark:border-gray-500
        "
        >
        <span>{location.pathname.split('/').map((value,key)=>value + ( key==0 ? '' : (key == location.pathname.split('/').length - 1 ? '' : ' > '))  )}</span>
      </div>
    else
      return <></>
  }
  
  return (
    <div className="w-full h-full
      bg-gray-200
      dark:bg-gray-600
    ">
      <HeaderView />
      <div className="w-full overflow-auto scrollbar-hide px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Apps;
