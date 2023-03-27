import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { css } from "@emotion/react";

const mainheight = css`
  height: 86vh;
`;
const DefaultLayout = () => {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        <>
          <Header />
          <SideBar />
          <main css={mainheight}>
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default DefaultLayout;
