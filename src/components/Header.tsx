import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";

const Header = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <>
      <div>Header</div>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default Header;
