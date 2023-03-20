import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState, FormEvent } from "react";
import { auth } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import LayoutAuth from "../templetes/LayoutAuth";

const Login = () => {
  const { user } = useAuthContext()
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (error) {
      alert("正しく入力してください");
    }
  };
  return (
    <>
      {user ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <LayoutAuth>
          <h2>ログイン</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button>ログイン</button>
            <p>
              新規登録は<Link to="/signup">こちら</Link>
            </p>
          </form>
        </LayoutAuth>
      )}
    </>
  );
};

export default Login;
