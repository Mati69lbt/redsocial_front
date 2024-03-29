import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import getProfile from "../../helpers/getProfile";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import PublicationList from "../publication/PublicationList";

const Profile = () => {
  const [user, setUser] = useState({});
  const [follows, setFollows] = useState(false);
  const [counters, setCounters] = useState({});
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { publicaciones, seguidores, siguiendo } = counters;

  const { auth } = useAuth();

  const params = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    getDataUser();
    getCounters();
    getPublications(1, true);
  }, []);

  useEffect(() => {
    getDataUser();
    getCounters();
    getPublications(1, true);
  }, [params]);

  const getDataUser = async () => {
    const dataUser = await getProfile(params.userId, setUser, token);
    if (dataUser.lo_sigo && dataUser.lo_sigo._id) setFollows(true);
    try {
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCounters = async () => {
    try {
      const requestCounters = await fetch(
        Global.url_backend + "user/estadisticas/" + params.userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      // Devolver todos los datos del usuario
      const data = await requestCounters.json();
      if (data.seguidores) {
        setCounters(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
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
        setFollows(true);
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
        setFollows(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const getPublications = async (nextPage = 1, newProfile = false) => {
    try {
      const request = await fetch(
        Global.url_backend +
          "publication/publicaciones-de-un-usuario/" +
          params.userId +
          "/" +
          nextPage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await request.json();

      if (data.status === "success") {
        let newPublication = data.publicaciones.docs;
        setTotal(data.totalPages);

        if (!newProfile && publications.length >= 1) {
          newPublication = [...publications, ...newPublication];
        }
        if (newProfile) {
          newPublication = data.publicaciones.docs;
          setTotal(data.totalPages);
          setPage(1);
        }

        setPublications(newPublication);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <header className="aside__profile-info">
        <div className="profile-info__general-info">
          <div className="general-info__container-avatar">
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
          </div>

          <div className="general-info__container-names">
            <div className="container-names__name">
              <h1>
                {user.name}
                {user.surname}
              </h1>
              {user._id != auth._id &&
                (follows ? (
                  <button
                    className="content__button content__button--right post__button"
                    onClick={() => unFollow(user._id)}
                  >
                    Dejar de Seguir
                  </button>
                ) : (
                  <button
                    className="content__button content__button--right"
                    onClick={() => follow(user._id)}
                  >
                    Seguir
                  </button>
                ))}
            </div>
            <h2 className="container-names__nickname"> {user.nick}</h2>
            <p className="prueba"> {user.bio}</p>
          </div>
        </div>

        <div className="profile-info__stats">
          <div className="stats__following">
            <Link
              to={"/social/Siguiendo/" + user._id}
              className="following__link"
            >
              <span className="following__title">Siguiendo</span>
              <span className="following__number">
                {siguiendo ? siguiendo : 0}
              </span>
            </Link>
          </div>
          <div className="stats__following">
            <Link
              to={"/social/seguidores/" + user._id}
              className="following__link"
            >
              <span className="following__title">Seguidores</span>
              <span className="following__number">
                {seguidores ? seguidores : 0}
              </span>
            </Link>
          </div>

          <div className="stats__following">
            <a href="#" className="following__link">
              <span className="following__title">Publicaciones</span>
              <span className="following__number">
                {publicaciones ? publicaciones : 0}
              </span>
            </a>
          </div>
        </div>
      </header>

      <PublicationList
        publications={publications}
        page={page}
        setPage={setPage}
        total={total}
        getPublications={getPublications}
      />
    </>
  );
};

export default Profile;
