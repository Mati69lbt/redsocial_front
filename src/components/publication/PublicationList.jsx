import avatar from "../../assets/img/user.png";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from "react-time-ago";

const PublicationList = ({
  publications,
  page,
  setPage,
  total,
  getPublications,
}) => {
  const { auth } = useAuth();

  const borrarPublicacion = async (id) => {
    try {
      const request = await fetch(
        Global.url_backend + "publication/eliminar-publicacion/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await request.json();

      // Actualiazar estado de following, con el nuevo follow
      if (data.status === "success") {
        setPage(1);
        getPublications(1, true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sigPage = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next);
  };
  return (
    <>
      <div className="content__posts">
        {publications.map((publication) => {
          return (
            <article className="posts__post" key={publication._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/social/perfil/" + publication.user._id}
                    className="post__image-link"
                  >
                    {publication.user.image != "default.png" ? (
                      <img
                        src={
                          Global.url_backend +
                          "user/avatar/" +
                          publication.user.image
                        }
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    ) : (
                      <img
                        src={avatar}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    )}
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {publication.user.name} {publication.user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <ReactTimeAgo
                        date={new Date(publication.created_at).getTime()}
                        locale="es-Es"
                      >
                        {publication.created_at}
                      </ReactTimeAgo>
                    </a>
                  </div>

                  <h4 className="post__content">{publication.text}</h4>
                  {/* Se muestra la imagen si hay alguna */}
                  {publication.file && (
                    <img
                      src={
                        Global.url_backend +
                        "publication/imagen/" +
                        publication.file
                      }
                      className="post__image"
                      alt="Publicación"
                    />
                  )}
                </div>
              </div>
              {auth._id == publication.user._id && (
                <div className="post__buttons">
                  <button
                    className="post__button"
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "¿Estás seguro de que quieres borrar esta publicación?"
                      );
                      if (confirmDelete) {
                        borrarPublicacion(publication._id);
                      }
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {page < total && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={sigPage}>
            Ver mas publicaciones
          </button>
        </div>
      )}
    </>
  );
};

export default PublicationList;
