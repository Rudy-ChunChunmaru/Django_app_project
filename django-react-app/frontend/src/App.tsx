import { useState } from "react";
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

  const [thame,setThame] = useState(VariableApps.thame.light)

  return (
    <div className={`relative ${thame.font} text-[1rm] w-screen h-screen`}>
      <div className='w-full relative top-0'>
        <Navbar />
      </div>
      <div className='w-full item-center overflow-auto my-3'>
        <Routes>
          {RouteApps()}
          <Route key="-1" index element={<Index />}></Route>
          <Route key="-2" path="login" element={<Login />} />
          <Route key="-3" path="logout" element={<Logout />} />
          <Route key="-4" path="*" element={<ErrorNotFound />} />
        </Routes>
      </div>
      <div className="fixed bottom-0 flex w-full flex-row justify-between border-b-2 bg-gray-100 px-5 border-t-2">
        <div>{VariableApps.TitleApps}©Copyright</div>
        <div>A.K.A ChunChunMaru</div>
      </div>
    </div>
  );
}

export default App;
