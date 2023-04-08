import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { css } from "@emotion/react";

const mainheight = css`
  padding: 100px 100px 100px 200px;
`;
const DefaultLayout = () => {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        <>
          <Header />
          <main css={mainheight}>
            <SideBar />
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
