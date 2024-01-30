import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";

const UserList = ({users, setUsers, following, setFollowing}) => {
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
          "Content-Type": "application/json",
          body: JSON.stringify({ followed: id }),
          headers: {
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
    // Actualizar estado following
    // Filtrar los datos para eliminar el antiguo ID q no sigo mas
  };
  return (
    <div className="content__posts">
      {users.map((user) => {
        const key =
          user._id && user.name ? `${user._id}-${user.name}` : Math.random();
        return (
          <article className="posts__post" key={key}>
            <div className="post__container">
              <div className="post__image-user">
                <a href="#" className="post__image-link">
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
                </a>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {user.name} {user.surname}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                    {user.created_at}
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
                      unFollow(user._id);
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
  );
};

export default UserList;
