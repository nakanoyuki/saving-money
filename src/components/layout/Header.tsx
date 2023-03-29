import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { css } from "@emotion/react";
import SignOut from "../auth/SignOut";
import logo from "../../img/logo.png";
import { Button } from "@mui/material";

const header = css`
  display: flex;
  background: #fff;
  height: 50px;
  width: 100%;
`;
const logoarea = css`
  color: #fff;
`;
const Header = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <div className="header" css={header}>
      <Link to="/">
        <img src={logo} alt="収支管理APP" width="100" />
      </Link>
      {user ? (
        <>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive ? "active" : isPending ? "pending" : "";
            }}
            to="/mypage"
          >
            <Button
              sx={{
                color: "#4169e1",
                fontSize: "14px",
                fontWeight: "600",
                ml: "4px",
              }}
            >
              マイページ</Button>
          </NavLink>
          <SignOut />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
