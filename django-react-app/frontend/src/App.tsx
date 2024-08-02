import { Route, Routes } from "react-router-dom";

import Index from "./pages/common";
import ErrorRouter from "./pages/common/error-router";
import Login from "./pages/common/login";
import ErrorNotFound from "./pages/common/error-notfound";

import User from "./pages/apps/common/user";
import Group from "./pages/apps/common/group";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Index />} errorElement={<ErrorRouter />}>
          <Route path="user" element={<User />} />
          <Route path="group" element={<Group />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </>
  );
}

export default App;
