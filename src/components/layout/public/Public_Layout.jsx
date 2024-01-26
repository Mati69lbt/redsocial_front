import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Public_Layout = () => {
  return (
    <>
      {/* LAYOUT */}
      <Header />

      {/* Contenido Principal */}
      <section className="layout__content">
        <Outlet />
      </section>
    </>
  );
};

export default Public_Layout;
