import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";

const DefaultLayout = () => {
  const { user } = useAuthContext();
  return (
    <>
      {!user ? (
        <>
          <Navigate to="/login" />
        </>
      ) : (
        <>
          <Header />
          <SideBar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default DefaultLayout;
