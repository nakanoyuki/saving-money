import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { css } from "@emotion/react";
import SignOut from "../auth/SignOut";
import logo from "../../img/logo.png";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 70px;
  width: 100%;
`;
const Header = () => {
  const { user } = useAuthContext();

  return (
    <AppBar >
      <Toolbar css={header}>
        <Typography variant="h1">
          <Link to="/">
            <img src={logo} alt="収支管理APP" width="100" />
          </Link>
        </Typography>

        {user ? (
          <div>
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
                マイページ
              </Button>
            </NavLink>
            <SignOut />
          </div>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
