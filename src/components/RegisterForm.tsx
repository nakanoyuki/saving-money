import { useState } from "react";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import "react-datepicker/dist/react-datepicker.css";
import { FormType } from "../type/type";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const RegisterForm = () => {
  // データ
  const paymentsdata = ["支出", "収入"];
  const categoriesdata = ["水道代", "その他"];
  const methodsdata = ["現金", "クレジット", "paypay"];

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
      taxamount: 0,
      paymentsItem: "--選択--",
      category: "--選択--",
      method: "--選択--",
      memo: "",
      userId: auth.currentUser?.email,
    },
  });

  const onSubmit = async (data: FormType) => {
    if (data.paymentsItem === "収入") {
      await addDoc(collection(db, "incomelists"), data);
    } else if (data.paymentsItem === "支出") {
      await addDoc(collection(db, "expenselists"), data);
    }
    reset();
    setIsProcessing(false);
  };

  // 税率計算ボタン
  const [result, setResult] = useState<number>(0);
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

  return (
    <>
      <Box component="form">
        <label>購入日時</label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              {...field}
              dateFormat="yyyy/MM/dd"
              selected={watch("date")}
              locale="ja"
            />
          )}
        />
        <label>収支</label>
        <select {...register("paymentsItem")}>
          <option disabled>--選択--</option>
          {paymentsdata.map((payment) => (
            <option key={payment} value={payment}>
              {payment}
            </option>
          ))}
        </select>

        <label>勘定科目</label>
        <select {...register("category")}>
          <option disabled>--選択--</option>
          {categoriesdata.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>支払い方法</label>
        <select {...register("method")}>
          <option disabled>--選択--</option>
          {methodsdata.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

        <label>金額</label>
        <input {...register("amount")} type="number" />
        <p>金額: {watch("amount")}円</p>
        <p>税金: {result}円</p>

        <label>税率</label>
        <Button
          variant="contained"
          disabled={btnDisabled}
          onClick={handleTaxButton}
        >
          10%
        </Button>
        <Button
          variant="outlined"
          disabled={!btnDisabled}
          onClick={handleNotTaxButton}
        >
          なし
        </Button>

        <label>備考</label>
        <textarea
          {...register("memo", { required: "memo is required" })}
          id="textarea"
          placeholder="備考"
        ></textarea>
        <p style={{ color: "red" }}>{errors.memo?.message}</p>
        <button
          type="submit"
          disabled={isProcessing}
          onClick={handleSubmit((data) => {
            setIsProcessing(true);
            onSubmit(data);
          })}
        >
          登録する
        </button>
        <button onClick={() => reset()}>リセットする</button>
      </Box>
    </>
  );
};

export default RegisterForm;
