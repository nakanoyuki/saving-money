import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { css } from "@emotion/react";

const header = css`
  display: flex;
  background: #4169e1;
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
      <div css={logoarea}>収支管理APP</div>
      {user ? (
        <>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive ? "active" : isPending ? "pending" : "";
            }}
            to="/mypage"
          >
            マイページ
          </NavLink>
          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
