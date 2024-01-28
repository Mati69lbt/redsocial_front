import { BrowserRouter, Route, Routes } from "react-router-dom";
import Public_Layout from "../components/layout/public/Public_Layout";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

import Feed from "../components/publication/Feed";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import NotFound from "../components/404/NotFound";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Enlaces Publicos */}
        <Route path="/" element={<Public_Layout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
        </Route>

        {/* Enlaces Privados */}
        <Route path="/social" element={<PrivateLayout />}>
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
