import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";
import UserList from "../user/UserList";
import getProfile from "../../helpers/getProfile";

const Siguiendo = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingGente, setLoadingGente] = useState(true);
  const [following, setFollowing] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const { nick } = userProfile;

  const params = useParams();

  const token = localStorage.getItem("token");
  useEffect(() => {
    getUsers();
    getProfile(params.userId, setUserProfile, token);
  }, []);

  const getUsers = async (nextPage = 1) => {
    setLoadingGente(true);

    // Sacar userId de la url
    const userId = params.userId;

    try {
      // Peticion para traer Usuarios
      const request = await fetch(
        Global.url_backend + "follower/following/" + userId + "/" + nextPage,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await request.json();

      // Recorrer y Limpiar follows para quedarme con followed
      let cleanUsers = [];
      data.resultados.docs.forEach((follow) => {
        console.log(follow);
        const esta = cleanUsers.some((user) => user._id === follow.user._id);
        if (!esta) {
          cleanUsers = [...cleanUsers, follow.followed];
        }
      });

      data.users = cleanUsers;

      data.users = cleanUsers;

      setTotal(data.totalPages);

      // Crear estado para poder listarlos
      if (data.status == "success" && data.users) {
        let newUsers = data.users;
        if (users.length >= 1) {
          newUsers = [...users, ...data.users];
        }
        setUsers(newUsers);
        setFollowing(data.siguiendo);
        setLoadingGente(false);
      } else return;
    } catch (error) {
      console.log("error", error);
    }
  };
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">{nick}'s Followings</h1>
      </header>

      <UserList
        users={users}
        setUsers={setUsers}
        following={following}
        setFollowing={setFollowing}
        loadingGente={loadingGente}
        page={page}
        total={total}
        nextPage={nextPage}
      />
    </>
  );
};

export default Siguiendo;
