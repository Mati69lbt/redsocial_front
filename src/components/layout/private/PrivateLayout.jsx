import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {/* LAYOUT */}

        {/* Cabecera y Navegacion */}
        <Header />

        {/* Contenido Principal */}
        <section className="layout__content">
          {auth._id ? <Outlet /> : <Navigate to="/login" />}
        </section>

        {/* Barra Lateral */}
        <Sidebar />
      </>
    );
  }
};

export default PrivateLayout;
