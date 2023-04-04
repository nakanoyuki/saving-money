import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
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
import { auth } from "../../firebase";

const SignUp = () => {
  const { user } = useAuthContext();
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
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
              }}
            >
              <Typography component="h1" variant="h4">
                新規登録
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="名前"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                /> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
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
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 4, fontSize: 18, background: "#4169e1" }}
                >
                  登録する
                </Button>

                <Stack textAlign="center" fontSize="14px" color="#64A2D7">
                  <Link to="/login/">ログインはこちら</Link>
                </Stack>
              </Box>
            </Box>
          </Container>
        </LayoutAuth>
      )}
    </>
  );
};

export default SignUp;
