import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import UserList from "./UserList";

const Gente = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingGente, setLoadingGente] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const token = localStorage.getItem("token");
  const getUsers = async (nextPage = 1) => {
    setLoadingGente(true);
    try {
      // Peticion para traer Usuarios
      const request = await fetch(
        Global.url_backend + "user/list/" + nextPage,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await request.json();
      setTotal(data.total_de_paginas);

      // Crear estado para poder listarlos
      if (data.status == "success" && data.users) {
        let newUsers = data.users;
        if (users.length >= 1) {
          newUsers = [...users, ...newUsers];
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
        <h1 className="content__title">Comunidad</h1>
      </header>

      <UserList
        users={users}
        setUsers={setUsers}
        following={following}
        setFollowing={setFollowing}
      />
      
      {loadingGente ? <h1>Cargando...</h1> : ""}
      {page < total && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            + Usuarios
          </button>
        </div>
      )}
      <br />
    </>
  );
};

export default Gente;
