import { useState,useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Index from "./pages/common";
import ErrorRouter from "./pages/common/error-router";
import Login from "./pages/common/login";
import ErrorNotFound from "./pages/common/error-notfound";

import ProtectedRoute from "./components/protected-route";
import Logout from "./pages/common/logout";
import Apps from "./pages/apps";

import { routeList, routeListType } from "./data/routes-list";

import Bottom from "./components/bottom";


import loadData, {loadAppsType} from "./AppLoad";

function App() {
  const [dataApps, setDataApps] = useState<loadAppsType>(loadData());
  
  const RouteApps = () => {
    const LoopingRouteRender = (value: routeListType) => {
      return (
        <Route
          key={value.id}
          path={value.routeMenu}
          element={value.routeElement}
        >
          {value?.children?.length &&
            value.children.map((value) => LoopingRouteRender(value))}
        </Route>
      );
    };

    return (
      <Route
        key="0"
        path="apps"
        element={
          <ProtectedRoute>
            <Apps />
          </ProtectedRoute>
        }
        errorElement={<ErrorRouter />}
      >
        {routeList && routeList.map((value) => LoopingRouteRender(value))}
      </Route>
    );
  };

  useEffect(()=>{
    if(dataApps.theme == 'dark' && document.documentElement.classList.contains('dark') == false)
      document.documentElement.classList.toggle('dark');
    else if(dataApps.theme == 'light' && document.documentElement.classList.contains('dark') == true)
      document.documentElement.classList.toggle('dark');
  },[dataApps])

  return (
    <div className='relative text-[1rm] text-black dark:text-white w-screen h-screen flex flex-col justify-between overflow-none'>
      <div className='w-full h-fit text-sm'>
        <Navbar dataApps={dataApps} setDataApps={setDataApps} />
      </div>
      <div className='w-full h-full overflow-none text-normal'>
        <Routes>
          {RouteApps()}
          <Route key="-1" index element={<Index />}></Route>
          <Route key="-2" path="login" element={<Login dataApps={dataApps} setDataApps={setDataApps} />} />
          <Route key="-3" path="logout" element={<Logout setDataApps={setDataApps} />} />
          <Route key="-4" path="*" element={<ErrorNotFound />} />
        </Routes>
      </div>
      <div className='w-full overflow-none text-sm'>
          <Bottom />
      </div>
    </div>
  );
}

export default App;
