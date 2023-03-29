import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState, FormEvent } from "react";
import { auth } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import LayoutAuth from "../templetes/LayoutAuth";
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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
          <Container maxWidth="xs">
            <Box
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 420,
                background: "#fff",
                fontSize: "16px",
              }}
            >
              <Typography component="h1" variant="h4">
                ログイン
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 4, fontSize: 18, background: "#4169e1" }}
                >
                  ログイン
                </Button>

                <Stack textAlign="center" fontSize="14px" color="#64A2D7">
                  <Link to="/signup/">新規登録はこちら</Link>
                </Stack>
              </Box>
            </Box>
          </Container>
        </LayoutAuth>
      )}
    </>
  );
};

export default Login;
