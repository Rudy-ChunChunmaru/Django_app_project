import { Route, Routes, Navigate } from "react-router-dom";

import Index from "./pages/common";
import ErrorRouter from "./pages/common/error-router";
import Login from "./pages/common/login";
import ErrorNotFound from "./pages/common/error-notfound";

import User from "./pages/apps/common/user";
import Group from "./pages/apps/common/group";
import ProtectedRoute from "./components/protected-route";
import Logout from "./pages/common/logout";
import Log from "./pages/common/log";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Index />}></Route>

        <Route path="log" element={<Log />} errorElement={<ErrorRouter />}>
          <Route
            path="user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="group"
            element={
              <ProtectedRoute>
                <Group />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </>
  );
}

export default App;
