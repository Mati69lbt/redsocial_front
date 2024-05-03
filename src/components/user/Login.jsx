import { useState } from "react";
import { Global } from "../../helpers/Global";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// Importar un imagen
import verificado from "../../assets/img/verificado.png";

const Login = () => {
  const { form, changed } = useForm();
  const [logueado, setLogueado] = useState("sin loguear");

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    let usuario_logueado = form;
    try {
      // Hacer peticion al backend
      console.log(Global.url_backend + "user/login");
      const request = await fetch(Global.url_backend + "user/login", {
        method: "POST",
        body: JSON.stringify(usuario_logueado),
        headers: { "Content-Type": "application/json" },
      });

      const data = await request.json();

      if (data.status == "success") {
        // Guadar los datos en el LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setLogueado("exito");

        // Guardar los datos en el context
        setAuth(data.user);
        // Redireccionar a la pagina principal
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setLogueado("error");
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      setLogueado("error");
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login </h1>
      </header>
      <div className="inicio_logueado">
        <div className="content__posts">
          {logueado == "exito" ? (
            <strong className="alert alert-success">
              Usuario Logueado con Exito
            </strong>
          ) : (
            ""
          )}

          {logueado == "error" ? (
            <strong className="alert alert-danger">
              Hubo problemas para Ingresar con su Cuenta
            </strong>
          ) : (
            ""
          )}
          <form action="" className="form-login" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">Correo Electronico</label>
              <input type="email" name="email" onChange={changed} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onChange={changed} />
            </div>

            <input type="submit" value="Ingresar" className="btn btn-success" />
          </form>
        </div>
        <div>
          <img src={verificado} alt="veri" />
          <h1 style={{ textAlign: "center" }} className="logh1">
            RSocial
          </h1>
        </div>
      </div>
    </>
  );
};

export default Login;
