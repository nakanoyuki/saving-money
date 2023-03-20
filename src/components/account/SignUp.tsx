import React, { useEffect, useState, FormEvent, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import LayoutAuth from "../templetes/LayoutAuth";

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
          <h2>新規登録</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <button>登録する</button>
            <p>
              ログインは<Link to="/login/">こちら</Link>
            </p>
          </form>
        </LayoutAuth>
      )}
    </>
  );
};

export default SignUp;
