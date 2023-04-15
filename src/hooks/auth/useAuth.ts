import { FormValues } from "../../type/type";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // email・パスワードログイン
  const emailLogin = async (data: FormValues) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      alert("正しく入力してください");
    }
    setIsLoading(false);
  };

  // Google新規登録
  const googleSignUp = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth", "true");
      });
      setIsLoading(true);
    } catch (error) {
      alert("正しく入力してください");
    }
    setIsLoading(false);
  };



  return { emailLogin, googleSignUp, isLoading };
};
