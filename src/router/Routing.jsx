import { BrowserRouter, Route, Routes } from "react-router-dom";
import Public_Layout from "../components/layout/public/Public_Layout";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

import Feed from "../components/publication/Feed";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import NotFound from "../components/404/NotFound";
import AuthProvider from "../context/AuthProvider";
import LogOut from "../components/user/LogOut";
import Gente from "../components/user/Gente";
import Editar_Usuario from "../components/user/Editar_Usuario";
import Siguiendo from "../components/follow/Siguiendo";
import Seguidor from "../components/follow/Seguidor";

const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            <Route path="logout" element={<LogOut />} />
            <Route path="gente" element={<Gente />} />
            <Route path="editar" element={<Editar_Usuario />} />
            <Route path="siguiendo/:userId" element={<Siguiendo />} />
            <Route path="seguidores/:userId" element={<Seguidor />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
