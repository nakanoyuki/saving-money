import { useState } from "react";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import "react-datepicker/dist/react-datepicker.css";
import { FormType } from "../type/type";
import Button from "@mui/material/Button";
import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  TextField,
} from "@mui/material";

const RegisterForm = () => {
  // データ
  const paymentsdata = ["支出", "収入"];
  const categoriesdata = ["水道代", "その他"];
  const methodsdata = ["現金", "クレジット", "paypay"];

  // Yupエラーハンドリング
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

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      date: new Date(),
      amount: 0,
      paymentsItem: "--選択--",
      category: "--選択--",
      method: "--選択--",
      memo: "",
      uid: auth.currentUser?.uid,
    },
    resolver: yupResolver(Registerschema),
  });
  // 税率計算ボタン
  let [result, setResult] = useState<number>(0);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleTaxButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentAmount = getValues("amount");
    const result = setResult(Math.floor(currentAmount * 0.1));
    setBtnDisabled(!btnDisabled);
  };

  const handleNotTaxButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = setResult(0);
    setBtnDisabled(!btnDisabled);
  };

  // 自動的に税率計算
  React.useEffect(() => {
    const currentAmount = getValues("amount");
    const result = setResult(Math.floor(currentAmount * 0.1));
  }, [getValues("amount")]);

  const onSubmit = async (data: FormType) => {
    await addDoc(collection(db, "lists"), data);
    reset();
    setIsProcessing(false);
  };

  const handleResetButton = () => {
    setResult(0);
    reset();
  };

  return (
    <>
      <Grid container>
        <Box component="form">
          <InputLabel htmlFor="date">購入日時</InputLabel>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                {...field}
                dateFormat="yyyy/MM/dd"
                selected={watch("date")}
                locale="ja"
                inline
              />
            )}
          />

          <InputLabel htmlFor="paymentsItem">収支</InputLabel>
          <Controller
            name="paymentsItem"
            control={control}
            defaultValue="--選択--"
            render={({ field }) => (
              <TextField
                {...field}
                label="収支"
                fullWidth
                margin="normal"
                id="select"
                error={!!errors.paymentsItem}
                select
              >
                <MenuItem disabled>--選択--</MenuItem>
                {paymentsdata.map((payment) => (
                  <MenuItem key={payment} value={payment}>
                    {payment}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <FormHelperText sx={{ color: "red" }}>
            {errors.paymentsItem?.message}
          </FormHelperText>
          <InputLabel htmlFor="category">勘定科目</InputLabel>
          <Controller
            name="category"
            control={control}
            defaultValue="--選択--"
            render={({ field }) => (
              <TextField
                {...field}
                label="勘定科目"
                fullWidth
                margin="normal"
                id="select"
                error={!!errors.category}
                select
              >
                <MenuItem disabled>--選択--</MenuItem>
                {categoriesdata.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <FormHelperText sx={{ color: "red" }}>
            {errors.category?.message}
          </FormHelperText>
          <InputLabel htmlFor="method">支払い方法</InputLabel>
          <Controller
            name="method"
            control={control}
            defaultValue="--選択--"
            render={({ field }) => (
              <TextField
                {...field}
                label="支払い方法"
                fullWidth
                margin="normal"
                id="select"
                error={!!errors.method}
                select
              >
                <MenuItem disabled>--選択--</MenuItem>
                {methodsdata.map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <FormHelperText sx={{ color: "red" }}>
            {errors.method?.message}
          </FormHelperText>
          <InputLabel htmlFor="amount">金額</InputLabel>
          <TextField
            required
            label="金額"
            variant="standard"
            {...register("amount")}
            id="standard-number"
            type="number"
            error={!!errors.amount}
          />
          <p>税金: {result}円</p>
          <p>合計: {watch("amount")}円</p>
          <FormHelperText sx={{ color: "red" }}>
            {errors.amount?.message}
          </FormHelperText>
          <Button
            variant="contained"
            disabled={!btnDisabled}
            onClick={handleTaxButton}
          >
            10%
          </Button>
          <Button
            variant="outlined"
            disabled={btnDisabled}
            onClick={handleNotTaxButton}
          >
            なし
          </Button>
          <InputLabel htmlFor="memo">備考</InputLabel>
          <TextareaAutosize
            {...register("memo")}
            id="textarea"
            placeholder="備考"
            minRows={3}
            maxRows={10}
            aria-label="maximum height"
            style={{ width: 400 }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isProcessing}
            onClick={handleSubmit((data) => {
              setIsProcessing(true);
              onSubmit(data);
              reset();
            })}
          >
            登録する
          </Button>
          <Button type="reset" onClick={handleResetButton}>
            リセットする
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default RegisterForm;
