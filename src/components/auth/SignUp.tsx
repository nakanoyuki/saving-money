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
import { validation } from "../../hooks/validation";
import { FormValues } from "../../type/type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/auth/useAuth";

const SignUp = () => {
  const { user } = useAuthContext();
  const { emailLogin, googleSignUp,onClickGuestButton, isLoading } = useAuth();
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
                  }}
                >
                  <Typography component="h1" variant="h4">
                    新規登録
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
                      id="password"
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
                      登録する
                    </Button>

                    <Button onClick={googleSignUp}>
                      Googleアカウントで新規登録
                    </Button>

                    <Button onClick={onClickGuestButton}>
                      ゲストユーザーとしてログイン
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
      )}
    </>
  );
};

export default SignUp;
