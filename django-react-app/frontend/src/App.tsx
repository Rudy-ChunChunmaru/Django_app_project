import { Route, Routes } from "react-router-dom";
import Index from "./pages/common";
import ErrorRouter from "./pages/common/error-router";
import Login from "./pages/common/login";
import ErrorNotFound from "./pages/common/error-notfound";

function App() {
  return (
    <Routes>
      <Route index element={<Index />} errorElement={<ErrorRouter />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
}

export default App;
