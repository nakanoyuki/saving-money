import { useState } from "react";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import "react-datepicker/dist/react-datepicker.css";
import { FormType } from "../type/type";
import Button from "@mui/material/Button";
import {
  Alert,
  Box,
  css,
  FormHelperText,
  InputLabel,
  MenuItem,
  Snackbar,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { paymentsdata, categoriesdata, methodsdata } from "../api/data";
import { validation } from "../hooks/validation";

const RegisterForm = () => {
  // Yupエラーハンドリング
  const { Registerschema } = validation();

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

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = async (data: FormType) => {
    await addDoc(collection(db, "lists"), data);
    reset();
    setIsProcessing(false);
    setShow(true);
  };

  const handleResetButton = () => {
    setResult(0);
    reset();
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          mt: "2rem",
        }}
      >
        <Box
          sx={{
            border: "solid 1px #d9d9d9;",
            background: "#ffffff",
            width: "100%",
            p: "2.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box>
              <InputLabel htmlFor="date" sx={{ fontSize: 14, color: "#333" }}>
                購入日時
              </InputLabel>
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
            </Box>
            <Box sx={{ ml: "2rem" }}>
              <InputLabel
                htmlFor="paymentsItem"
                sx={{ fontSize: 14, color: "#333" }}
              >
                収支
              </InputLabel>
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
                    sx={{ background: "#ffffff", width: "300px" }}
                  >
                    <MenuItem sx={{ fontSize: 12 }} disabled>
                      --選択--
                    </MenuItem>
                    {paymentsdata.map((payment) => (
                      <MenuItem
                        sx={{ fontSize: 12 }}
                        key={payment}
                        value={payment}
                      >
                        {payment}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors.paymentsItem?.message}
              </FormHelperText>
            </Box>

            <Box sx={{ ml: "2rem" }}>
              <InputLabel
                htmlFor="category"
                sx={{ fontSize: 14, color: "#333" }}
              >
                勘定科目
              </InputLabel>
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
                    sx={{ background: "#ffffff", width: "300px" }}
                    inputProps={{ style: { fontSize: 14 } }}
                  >
                    <MenuItem sx={{ fontSize: 12 }} disabled>
                      --選択--
                    </MenuItem>
                    {categoriesdata.map((category) => (
                      <MenuItem
                        sx={{ fontSize: 12 }}
                        key={category}
                        value={category}
                      >
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors.category?.message}
              </FormHelperText>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "90%",
              mt: "1rem",
            }}
          >
            <Box>
              <InputLabel htmlFor="method" sx={{ fontSize: 14, color: "#333" }}>
                支払い方法
              </InputLabel>
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
                    sx={{ background: "#ffffff", width: "300px" }}
                    inputProps={{ style: { fontSize: 14 } }}
                  >
                    <MenuItem sx={{ fontSize: 12 }} disabled>
                      --選択--
                    </MenuItem>
                    {methodsdata.map((method) => (
                      <MenuItem
                        sx={{ fontSize: 12 }}
                        key={method}
                        value={method}
                      >
                        {method}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors.method?.message}
              </FormHelperText>
            </Box>

            <Box sx={{ ml: "2rem", width: "400px" }}>
              <InputLabel htmlFor="amount" sx={{ fontSize: 14, color: "#333" }}>
                金額
              </InputLabel>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  required
                  variant="standard"
                  {...register("amount")}
                  id="standard-number"
                  type="number"
                  error={!!errors.amount}
                  sx={{
                    background: "#ffffff",
                    width: "80%",
                    fontSize: 14,
                  }}
                  inputProps={{ style: { fontSize: 14 } }}
                />
                <Box sx={{ fontSize: 14 }}>円</Box>
              </Box>
              <FormHelperText sx={{ color: "red" }}>
                {errors.amount?.message}
              </FormHelperText>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: "1rem",
                  fontSize: 14,
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    disabled={!btnDisabled}
                    onClick={handleTaxButton}
                    sx={{ width: "100px" }}
                  >
                    10%
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={btnDisabled}
                    onClick={handleNotTaxButton}
                    sx={{ ml: "1rem", width: "100px" }}
                  >
                    なし
                  </Button>
                </Box>
                <Box>
                  <Box>税金: ¥{result.toLocaleString()}</Box>
                  <Box>
                    合計: ¥
                    {new Intl.NumberFormat("ja-JP").format(watch("amount"))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              mt: "1rem",
            }}
          >
            <InputLabel htmlFor="memo" sx={{ fontSize: 14, color: "#333" }}>
              備考
            </InputLabel>
            <TextareaAutosize
              {...register("memo")}
              id="textarea"
              placeholder="備考"
              minRows={5}
              maxRows={10}
              aria-label="maximum height"
              style={{
                border: "solid 1px #d9d9d9",
                background: "#ffffff",
                width: "100%",
                padding: "1rem",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
            m: "3rem auto 0",
          }}
        >
          <Button
            sx={{
              width: "40%",
              fontSize: 12,
              height: "50px",
              p: "1rem",
              fontWeight: "bold",
              borderRadius: "50px",
            }}
            type="reset"
            variant="outlined"
            onClick={handleResetButton}
          >
            リセットする
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "58%",
              fontSize: "1.6rem",
              height: "50px",
              p: "1rem",
              fontWeight: "bold",
              borderRadius: "50px",
            }}
            disabled={isProcessing}
            onClick={handleSubmit((data) => {
              setIsProcessing(true);
              onSubmit(data);
              reset();
            })}
          >
            登録する
          </Button>
        </Box>
      </Box>
      <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          登録が完了しました！
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterForm;
