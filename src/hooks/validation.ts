import * as yup from "yup";

export const validation = () => {
  // Yupのバリデーションを分離し、再利用しやすく
  const Loginschema = yup.object().shape({
    email: yup.string().required("メールアドレスを入力してください"),
    password: yup.string().required("パスワードを入力してください"),
  });
  const Registerschema = yup.object().shape({
    amount: yup
      .number()
      .required("金額を入力してください")
      .min(1, "金額を入力してください"),
    paymentsItem: yup
      .string()
      .required()
      .notOneOf(["--選択--"], "収支を選択してください"),
    category: yup
      .string()
      .required()
      .notOneOf(["--選択--"], "勘定科目を選択してください"),
    method: yup
      .string()
      .required()
      .notOneOf(["--選択--"], "支払い方法を選択してください"),
  });

  return { Loginschema, Registerschema };
};
