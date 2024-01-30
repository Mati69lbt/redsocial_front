import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";
import SerializeForm from "../../helpers/SerializeForm";

const Editar_Usuario = () => {
  const [guardado, setGuardado] = useState("no_guardado");

  const { auth, setAuth } = useAuth();

  const url_img = Global.url_backend + "user/avatar/" + auth.image;

  // Crea una constante del token y agarra el token del localStorage
  const token = localStorage.getItem("token");

  const updateUser = async (e) => {
    e.preventDefault();

    // Recoger Datos del Usuario
    let newDataUser = SerializeForm(e.target);
    // Borrar propiedad innecesario
    delete newDataUser.file0;
    try {
      const request = await fetch(Global.url_backend + "user/update", {
        method: "PUT",
        body: JSON.stringify(newDataUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await request.json();
      if (data.status == "success") {
        delete data.user.password;
        setAuth(data.user);
        setGuardado("guardado");
     
      } else {
        setGuardado("error");
      }
      // Subir Imagen
      const fileInput = document.querySelector("#file");
      if (data.status == "success" && fileInput.files[0]) {
        // recoger imagen a subir
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);

        // Peticion para guardar la imagen subida en el servidor
        const uploadRequest = await fetch(Global.url_backend + "user/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        });

        const uploadData = await uploadRequest.json();
        
        if (uploadData.status === "success" && uploadData) {
          delete uploadData.user.password;
          setAuth(uploadData.user);
          setGuardado("guardado");
        } else {
          setGuardado("error");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Editar Usuario</h1>
      </header>
      <div className="content__posts">
        {guardado == "guardado" ? (
          <strong className="alert alert-success">
            Usuario Editado con Exito
          </strong>
        ) : (
          ""
        )}

        {guardado == "error" ? (
          <strong className="alert alert-danger">
            Hubo problemas con la Editacion
          </strong>
        ) : (
          ""
        )}
        <form action="" className="config-form" onSubmit={updateUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" defaultValue={auth.name} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" defaultValue={auth.surname} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" defaultValue={auth.nick} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" name="email" defaultValue={auth.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" defaultValue={auth.bio} />
          </div>
          <div className="form-group">
            <label htmlFor="file=">Avatar</label>
            <div className="avatar">
              <img
                src={auth.image !== "default.png" ? url_img : avatar}
                className="list-end__img"
                alt="Imagen de perfil"
              />
              <br />
            </div>
            <input type="file" name="file0" id="file" />
          </div>
          <br />
          <input type="submit" value="Actualizar" className="btn btn-success" />
        </form>
        <br />
      </div>
    </>
  );
};

export default Editar_Usuario;
