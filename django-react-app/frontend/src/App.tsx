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
import {VariableApps} from "./data/variable-apps";

function App() {
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

  const [dataApps, setDataApps] = useState<{theme:string}>({theme:'dark'});

  useEffect(()=>{
    if(document.documentElement.classList.contains(dataApps.theme) == false)
      document.documentElement.classList.toggle('dark');
  },[dataApps])

  return (
    <div className='relative text-[1rm] text-black dark:text-white w-screen h-screen flex flex-col justify-between'>
      <div className='w-full h-fit'>
        <Navbar dataApps={dataApps} setDataApps={setDataApps} />
      </div>
      <div className='w-full overflow-auto'>
        <Routes>
          {RouteApps()}
          <Route key="-1" index element={<Index />}></Route>
          <Route key="-2" path="login" element={<Login />} />
          <Route key="-3" path="logout" element={<Logout />} />
          <Route key="-4" path="*" element={<ErrorNotFound />} />
        </Routes>
      </div>
      <div 
          className='text-sm flex w-screen flex-row justify-between px-5 border-t-2
          border-gray-300 bg-gray-100  
          dark:border-gray-500 dark:bg-gray-700'
        >
        <div>{VariableApps.TitleApps}©Copyright</div>
        <div>A.K.A ChunChunMaru</div>
      </div>
    </div>
  );
}

export default App;
