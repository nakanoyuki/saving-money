import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import "react-datepicker/dist/react-datepicker.css";
import { FormType } from "../type/type";
import { getAuth } from "@firebase/auth";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";

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
    },
  });

  const onSubmit = async (data: FormType) => {
    await addDoc(collection(db, "lists"), data);
    reset();
  };

  // 税率計算ボタン
  const [result, setResult] = useState<number>(0);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button disabled={btnDisabled} onClick={handleTaxButton}>
          10%
        </button>
        <button disabled={!btnDisabled} onClick={handleNotTaxButton}>
          なし
        </button>

        <label>備考</label>
        <textarea
          {...register("memo", { required: "memo is required" })}
          id="textarea"
          placeholder="備考"
        ></textarea>
        <p style={{ color: "red" }}>{errors.memo?.message}</p>
        <button type="submit">登録する</button>
        <button onClick={() => reset()}>リセットする</button>
      </form>
    </>
  );
};

export default RegisterForm;
