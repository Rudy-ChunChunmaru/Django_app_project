import { Route, Routes } from "react-router-dom";

import Index from "./pages/common";
import ErrorRouter from "./pages/common/error-router";
import Login from "./pages/common/login";
import ErrorNotFound from "./pages/common/error-notfound";

import ProtectedRoute from "./components/protected-route";
import Logout from "./pages/common/logout";
import Apps from "./pages/apps";

import { routeList, routeListType } from "./data/routes-list";

function App() {
  const VariableApps = {

  }

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

  return (
    <div className='relative'>
      
      <Routes>
        {RouteApps()}
        <Route key="-1" index element={<Index />}></Route>
        <Route key="-2" path="login" element={<Login />} />
        <Route key="-3" path="logout" element={<Logout />} />
        <Route key="-4" path="*" element={<ErrorNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
