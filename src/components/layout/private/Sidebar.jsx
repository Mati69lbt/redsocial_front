import { Link, NavLink } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import { useState } from "react";

const Sidebar = () => {
  const { auth, contadores } = useAuth();
  const { form, changed } = useForm({});
  const [guardado, setGuardado] = useState("aun nada");

  const { publicaciones, seguidores, siguiendo } = contadores;

  const url_img = Global.url_backend + "user/avatar/" + auth.image;

  const token = localStorage.getItem("token");

  const savePublication = async (e) => {
    e.preventDefault();

    // Recoger los Datos del Formulario
    let newPublication = form;
    newPublication.user = auth._id;

    try {
      // Hacer request de guardar a la base de datos
      const request = await fetch(Global.url_backend + "publication/save", {
        method: "POST",
        body: JSON.stringify(newPublication),
        headers: { "Content-Type": "application/json", Authorization: token },
      });

      const data = await request.json();

      // Mostrar mensaje de exito o error
      if (data.status == "success") {
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
        const uploadRequest = await fetch(
          Global.url_backend + "publication/upload/" + data.publicacion._id,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: token,
            },
          }
        );

        const uploadData = await uploadRequest.json();

        if (uploadData.status === "success" && uploadData) {
          setGuardado("guardado");
        } else {
          setGuardado("error");
        }
        if (uploadData.status === "success" && data.status == "success") {
          // crea una constante con el nombre de resetear form y seleecciona el id del formulario
          const resetForm = document.querySelector("#publication-form");
          resetForm.reset();
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {auth.name}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {auth.image != "default.png" && (
                <img
                  src={url_img}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
              {auth.image == "default.png" && (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="general-info__container-names">
              <NavLink
                to={"/social/perfil/" + auth._id}
                className="container-names__name"
              >
                {auth.name} {auth.surname}
              </NavLink>
              <p className="container-names__nickname">{auth.nick}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link to={"Siguiendo/" + auth._id} className="following__link">
                <span className="following__title">Siguiendo</span>
                <span className="following__number">{siguiendo}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link to={"seguidores/" + auth._id} className="following__link">
                <span className="following__title">Seguidores</span>
                <span className="following__number">{seguidores}</span>
              </Link>
            </div>

            <div className="stats__following">
              <NavLink
                to={"/social/perfil/" + auth._id}
                className="following__link"
              >
                <span className="following__title">Publicaciones</span>
                <span className="following__number">{publicaciones}</span>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          {guardado === "guardado" && (
            <strong className="alert alert-success">
              Publicacion Publicada
            </strong>
          )}

          {guardado === "error" && (
            <strong className="alert alert-danger">
              Hubo Problemas con la Publicacion
            </strong>
          )}
          <form
            className="container-form__form-post"
            onSubmit={savePublication}
            id="publication-form"
          >
            <div className="form-post__inputs">
              <label html="text" className="form-post__label">
                ¿Que estas pensando hoy?
              </label>
              <textarea
                name="text"
                className="form-post__textarea"
                onChange={changed}
              ></textarea>
            </div>

            <div className="form-post__inputs">
              <label html="file" className="form-post__label">
                Sube tu foto
              </label>
              <input
                type="file"
                name="file0"
                id="file"
                className="form-post__image"
              />
            </div>

            <input
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
