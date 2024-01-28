import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <>
      {/* LAYOUT */}

      {/* Cabecera y Navegacion */}
      <Header />

      {/* Contenido Principal */}
      <section className="layout__content">
        <Outlet />
      </section>

      {/* Barra Lateral */}
      <Sidebar />
    </>
  );
};

export default PrivateLayout;

// src\components\layout\private\PrivateLayout.jsx
