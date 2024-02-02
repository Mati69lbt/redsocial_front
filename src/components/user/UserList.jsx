import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const UserList = ({
  users,
  setUsers,
  following,
  setFollowing,
  loadingGente,
  total,
  page,
  nextPage,
}) => {
  const { auth } = useAuth();

  const token = localStorage.getItem("token");

  const follow = async (id) => {
    try {
      // Hacer Peticion al backend para guardar el follow
      const request = await fetch(Global.url_backend + "follower/save", {
        method: "POST",
        body: JSON.stringify({ followed: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await request.json();

      // Actualiuzar estado de following, con el nuevo follow
      if (data.status === "success") {
        setFollowing([...following, id]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const unFollow = async (id) => {
    try {
      // Hacer peticion al backend para borrar el follow
      const request = await fetch(
        Global.url_backend + "follower/unfollow/" + id,
        {
          method: "DELETE",
          body: JSON.stringify({ followed: id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await request.json();

      // Actualiazar estado de following, con el nuevo follow
      if (data.status === "success") {
        let filtroFollowings = following.filter((followId) => id !== followId);
        setFollowing(filtroFollowings);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="content__posts">
        {users.map((user) => {
          const key =
            user._id && user.name ? `${user._id}-${user.name}` : Math.random();
          return (
            <article className="posts__post" key={key}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/social/perfil/" + user._id}
                    className="post__image-link"
                  >
                    {user.image != "default.png" ? (
                      <img
                        src={Global.url_backend + "user/avatar/" + user.image}
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
                    <Link
                      to={"/social/perfil/" + user._id}
                      className="user-info__name"
                    >
                      {user.name} {user.surname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <ReactTimeAgo
                        date={new Date(user.created_at).getTime()}
                        locale="es-Es"
                      >
                        {user.created_at}
                      </ReactTimeAgo>
                    </a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>
              {user._id != auth._id && (
                <div className="post__buttons">
                  {!following.includes(user._id) && (
                    <button
                      className="post__button post__button--green"
                      onClick={() => {
                        follow(user._id);
                      }}
                    >
                      Seguir
                    </button>
                  )}
                  {following.includes(user._id) && (
                    <button
                      className="post__button "
                      onClick={() => {
                        const confirmunFollow = window.confirm(
                          `¿Queres dejar de seguir a ${user.name}?`
                        );
                        confirmunFollow && unFollow(user._id);
                      }}
                    >
                      Dejar de Seguir
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {loadingGente ? <h1>Cargando...</h1> : ""}
      {page < total && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            + Usuarios
          </button>
        </div>
      )}
    </>
  );
};

export default UserList;
