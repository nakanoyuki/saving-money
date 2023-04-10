import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormType, FormValues } from "../type/type";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";

export const useLoginForm = () => {
  // Yupのバリデーションを分離し、再利用しやすく
  const Loginschema = yup.object().shape({
    email: yup.string().required("メールアドレスを入力してください"),
    password: yup.string().required("パスワードを入力してください"),
  });
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

  return { register, handleSubmit, errors };
};
