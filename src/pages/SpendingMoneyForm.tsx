import { css } from "@emotion/react";
import { useState } from "react";
import { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

import RegisterForm from "../components/RegisterForm";

const pageArea = css`
  padding: 50px 1% 100px 200px;
  h2 {
    font-weight: 700;
  }
`;
const SpendingMoneyForm = () => {
  const Today = new Date();
  const [date, setDate] = useState(Today);
  registerLocale("ja", ja);

  const [amount, setAmount] = useState<string>();
  const [paymentsItem, setPaymentsItem] = useState<string>("--選択--");
  const [category, setCategory] = useState<string>("--選択--");
  const [method, setMethod] = useState<string>("現金");
  const [memo, setMemo] = useState<string>();

  const onAddLists = async () => {
    await addDoc(collection(db, "lists"), {
      date: date,
      amount: amount,
      paymentsItem: paymentsItem,
      category: category,
      method: method,
      memo: memo,
    });
  };

  return (
    <div className="pageArea" css={pageArea}>
      <h2>収支登録</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddLists();
        }}
      >
        <RegisterForm
          date={date}
          setDate={setDate}
          Today={Today}
          amount={amount}
          setAmount={setAmount}
          paymentsItem={paymentsItem}
          setPaymentsItem={setPaymentsItem}
          category={category}
          setCategory={setCategory}
          method={method}
          setMethod={setMethod}
          memo={memo}
          setMemo={setMemo}
        />
        {/* <button onClick={clearVal}>リセットする</button> */}
        <button>登録する</button>
      </form>
    </div>
  );
};

export default SpendingMoneyForm;
