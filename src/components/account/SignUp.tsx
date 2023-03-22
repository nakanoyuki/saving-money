import React, { useEffect, useState, FormEvent, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import LayoutAuth from "../templetes/LayoutAuth";
import { css } from "@emotion/react";

const authBorder = css`
  width: 420px;
  margin: auto;
  padding: 3rem;
  background: #fff;
`;

const h2ttl = css`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin: 0 auto 2rem;
`;
const inputarea = css`
  width: 100%;
  border: solid 1px #d9d9d9;
  padding: 14px 0 12px 4px;
  margin: 0 0 2rem;
`;

const authButton = css`
  width: 100%;
  padding: 10px;
  border: none;
  background: #4169e1;
  color: #fff;
  border-radius: 5px;
  font-size: 1.8rem;
  margin: 2rem auto 0;
  cursor: pointer;
`;

const link = css`
  text-align: center;
  margin: 3rem 0 0 0;
  a {
    font-size: 1.4rem;
    color: #4169e1;
  }
`;

const SignUp = () => {
  const { user } = useAuthContext();
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
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
            <h2 css={h2ttl}>新規登録</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  css={inputarea}
                  placeholder="メールアドレス"
                  name="email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  css={inputarea}
                  placeholder="パスワード"
                  name="password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <button css={authButton}>登録する</button>
              <p css={link}>
                <Link to="/login/">ログインはこちら</Link>
              </p>
            </form>
          </div>
        </LayoutAuth>
      )}
    </>
  );
};

export default SignUp;
