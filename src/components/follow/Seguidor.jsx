import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";
import UserList from "../user/UserList";

const Seguidor = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingGente, setLoadingGente] = useState(true);
  const [following, setFollowing] = useState([]);

  const params = useParams();

  useEffect(() => {
    getUsers();
  }, []);

  const token = localStorage.getItem("token");

  const getUsers = async (nextPage = 1) => {
    setLoadingGente(true);

    // Sacar userId de la url
    const userId = params.userId;

    try {
      // Peticion para traer Usuarios
      const request = await fetch(
        Global.url_backend + "follower/followers/" + userId + "/" + nextPage,
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
        cleanUsers = [...cleanUsers, follow.user];
      });
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
        <h1 className="content__title">Followers</h1>
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

export default Seguidor;
