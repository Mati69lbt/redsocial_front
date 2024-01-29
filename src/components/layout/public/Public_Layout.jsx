import React from "react";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Public_Layout = () => {
  const { auth } = useAuth();

  return (
    <>
      {/* LAYOUT */}
      <Header />

      {/* Contenido Principal */}
      <section className="layout__content">
        {!auth._id ? <Outlet /> : <Navigate to="/social" />}
      </section>
    </>
  );
};

export default Public_Layout;
