import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      navigate("/");
    } catch (error) {
      alert("正しく入力してください");
    }
  };
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return (
    <>
      {user ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <>
          <>
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
              <p>ログインは<Link to="/login/">こちら</Link></p>
            </form>
          </>
        </>
      )}
    </>
  );
};

export default SignUp;
