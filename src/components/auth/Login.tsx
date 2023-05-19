import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/AuthProvider";
import LayoutAuth from "../templetes/LayoutAuth";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/auth/useAuth";
import { validation } from "../../hooks/validation";
import { useForm } from "react-hook-form";
import { FormValues } from "../../type/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

const Login = () => {
  const { user } = useAuthContext();

  const { emailLogin, googleSignUp, onClickGuestButton, isLoading } = useAuth();
  const { Loginschema } = validation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(Loginschema),
  });

  return (
    <>
      {isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
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
                    onSubmit={handleSubmit(emailLogin)}
                    noValidate
                    sx={{ mt: 1, width: "100%" }}
                  >
                    <InputLabel
                      htmlFor="password"
                      sx={{ fontSize: "1.4rem", fontWeight: "bold" }}
                    >
                      メールアドレス
                    </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="メールアドレス"
                      autoComplete="email"
                      autoFocus
                      {...register("email", { required: true })}
                    />
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.email?.message}
                    </FormHelperText>

                    <InputLabel
                      htmlFor="password"
                      sx={{ fontSize: "1.4rem", fontWeight: "bold" }}
                    >
                      パスワード
                    </InputLabel>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="パスワード"
                      type="password"
                      autoComplete="current-password"
                      {...register("password", { required: true })}
                    />
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.password?.message}
                    </FormHelperText>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 4, fontSize: 18, background: "#4169e1" }}
                    >
                      ログイン
                    </Button>

                    <Button onClick={googleSignUp}>
                      Googleアカウントでログイン
                    </Button>

                    <Button onClick={onClickGuestButton}>
                      ゲストユーザーとしてログイン
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
      )}
    </>
  );
};

export default Login;
