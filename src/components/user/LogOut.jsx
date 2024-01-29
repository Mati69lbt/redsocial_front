import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const { setAuth, setContadores } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //  Vaciar el LocalStorage
    localStorage.clear();
    // Setear estados globales a vacio
    setAuth({});
    setContadores({});
    // Redireccionar al login
    navigate("/login");
  });

  return <h1>Cerrando la Sesión...</h1>;
};

export default LogOut;
