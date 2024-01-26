import { BrowserRouter, Route, Routes } from "react-router-dom";
import Public_Layout from "../components/layout/public/Public_Layout";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public_Layout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
