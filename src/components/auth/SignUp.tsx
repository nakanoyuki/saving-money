import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import LayoutAuth from "../templetes/LayoutAuth";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { auth, provider } from "../../firebase";
import { useLoginForm } from "../../hooks/useLoginForm";
import { FormValues } from "../../type/type";
import { useState } from "react";

const SignUp = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useLoginForm();
  const onSubmit = async (data: FormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/home");
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  // Google新規登録
  // const googleSignUp = ({ setisAuth }: boolean) => {
  //   console.log(googleSignUp)
  //   signInWithPopup(auth, provider).then((result) => {
  //     localStorage.setItem("isAuth", true);
  //     setisAuth(true);
  //   });
  // };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const googleSignUp = async (): Promise<void> => {
		try {
			setIsLoading(true);
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			const user = auth.currentUser;
			if (user) {
				// const docRef = doc(db, "users", user.uid);
				// const docSnap = await getDoc(docRef);
				// if (!docSnap.exists()) {
				// 	await setDoc(docRef, {
				// 		name: user.providerData[0].displayName,
				// 		email: user.providerData[0].email,
				// 		userImg: user.providerData[0].photoURL,
				// 		uid: user.uid,
				// 		text: "",
				// 		createTime: serverTimestamp(),
				// 		updateTime: serverTimestamp(),
				// 		username: user.providerData[0]
				// 			.displayName!.split(" ")
				// 			.join("")
				// 			.toLocaleLowerCase(),
				// 	});
				// }
				setIsLoading(false);
        navigate("/home");
			}
		} catch (error) {
			alert(error);
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
              <button onClick={googleSignUp}>googleアカウントで新規登録</button>
              <Typography component="h1" variant="h4">
                新規登録
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1, width: "100%" }}
              >
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
