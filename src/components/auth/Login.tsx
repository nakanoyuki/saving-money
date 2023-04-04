import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, FormEvent } from "react";
import { auth } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import LayoutAuth from "../templetes/LayoutAuth";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const { user } = useAuthContext();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/home");
    } catch (error) {
      alert("正しく入力してください");
    }
  };
  return (
    <>
      {user ? (
        <>
          <Navigate to="/home" />
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
