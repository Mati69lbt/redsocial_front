import { useState, useEffect, createContext } from "react";
import { Global } from "../helpers/Global";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [contadores, setContadores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    // Sacar Datos del usuario identificado en el localstorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Comprobar si hay token y user
    if (!token || !user) {
      setLoading(false);
      return false;
    }
    // Transformar los datos a un objeto de javascript
    const userObject = JSON.parse(user);
    const userId = userObject.id;

    // Hacer una peticion ajax al backend que compruebe el token
    const request = await fetch(Global.url_backend + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    // Devolver todos los datos del usuario
    const data = await request.json();

    // Peticion para los contadores
    const requestCounters = await fetch(
      Global.url_backend + "user/estadisticas/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    // Devolver todos los datos del usuario
    const dataCounters = await requestCounters.json();

    // Setear el  estado de auth
    if (data.status === "success") {
      setAuth(data.user);
    } else return;
    setContadores(dataCounters);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, contadores, setContadores, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
