import PublicationList from "./PublicationList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";

const Feed = () => {
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const params = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    getPublications(1, false);
  }, []);

  const getPublications = async (nextPage = 1, showNews = false) => {
    if (showNews) {
      setPublications([]);
      setPage(1);
      nextPage(1);
    }
    try {
      const request = await fetch(
        Global.url_backend + "publication/feed/" + nextPage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await request.json();

      if (data.status === "success") {
        let newPublication = data.busqueda.docs;
        setTotal(data.totalPages);

        // Filtrar las publicaciones duplicadas
        newPublication = newPublication.filter(
          (pub) =>
            !publications.some((existingPub) => existingPub._id === pub._id)
        );

        if (!showNews && publications.length >= 1) {
          newPublication = [...publications, ...newPublication];
          setTotal(data.totalPages);
        }

        setPublications(newPublication);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button
          className="content__button"
          onClick={() => getPublications(1, true)}
        >
          Mostrar nuevas
        </button>
      </header>

      <PublicationList
        publications={publications}
        setPublications={setPublications}
        page={page}
        setPage={setPage}
        total={total}
        getPublications={getPublications}
      />
    </>
  );
};

export default Feed;
