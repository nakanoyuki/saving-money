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
import { css } from "@emotion/react";

const authBorder = css`
  border: solid 1px #d9d9d9;
  width: 500px;
  margin: auto;
  padding: 2rem;
  background: #fff;
`;

const h2ttl = css`
  font-size: 1.4rem;
  text-align: center;
  margin: 0 auto 1rem;
`;
const inputarea = css`
  width: 100%;
  border: solid 1px #d9d9d9;
  padding: 10px 0 8px 4px;
  margin: 0 0 20px;
`;

const authButton = css`
  width: 100%;
  padding: 10px;
  border: none;
  background: #4169e1;
  border-radius: 5px;
  font-size: 2rem;
`;

const Login = () => {
  const { user } = useAuthContext();
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
          <div css={authBorder}>
            <h2 css={h2ttl}>ログイン</h2>
            <form onSubmit={handleSubmit}>
              <input
                css={inputarea}
                placeholder="メールアドレス"
                name="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <input
                css={inputarea}
                placeholder="パスワード"
                name="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <button css={authButton}>ログイン</button>
              <p>
                新規登録は<Link to="/signup">こちら</Link>
              </p>
            </form>
          </div>
        </LayoutAuth>
      )}
    </>
  );
};

export default Login;
