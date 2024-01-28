import { useState } from "react";
import { Global } from "../../helpers/Global";
import useForm from "../../hooks/useForm";

const Register = () => {
  const { form, changed } = useForm();
  const [guardado, setGuardado] = useState("no_guardado");

  const saveUser = async (e) => {
    e.preventDefault();

    // Recoger Datos del Usuario del Formulario
    let newUser = form;

    // Guardar Usuario en la Base de Datos, desde el Backend
    const request = await fetch(Global.url_backend + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });

    const data = await request.json();
    if (data.status == "success") {
      setGuardado("guardado");
    } else {
      setGuardado("error");
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>
      <div className="content__posts">
        {guardado == "guardado" ? (
          <strong className="alert alert-success">
            Usuario Registrado con Exito
          </strong>
        ) : (
          ""
        )}

        {guardado == "error" ? (
          <strong className="alert alert-danger">
            Hubo problemas con la Registracion
          </strong>
        ) : (
          ""
        )}

        <form action="" className="register-form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input type="text" name="bio" onChange={changed} />
          </div>
          <input type="submit" value="Registrate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};

export default Register;
