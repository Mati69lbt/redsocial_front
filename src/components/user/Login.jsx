import { useState } from "react";
import { Global } from "../../helpers/Global";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { form, changed } = useForm();
  const [logueado, setLogueado] = useState("sin loguear");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    let usuario_logueado = form;

    // Hacer peticion al backend
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
    } else {
      setLogueado("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login </h1>
      </header>

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

          <input
            type="submit"
            value="Ingresar"
            className="btn btn-success"
            onClick={() => {
              navigate("/social");
            }}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
