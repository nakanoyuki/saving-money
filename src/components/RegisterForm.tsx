import { SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import "react-datepicker/dist/react-datepicker.css";

export type Props = {
  // eslint-disable-next-line
  date: any;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  Today: Date;
  amount: string | undefined;
  setAmount: React.Dispatch<React.SetStateAction<string | undefined>>;
  paymentsItem: string;
  setPaymentsItem: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  memo: string | undefined;
  setMemo: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const RegisterForm = ({
  date,
  setDate,
  Today,
  amount,
  setAmount,
  paymentsItem,
  setPaymentsItem,
  category,
  setCategory,
  method,
  setMethod,
  memo,
  setMemo,
}: Props) => {
  // データ
  const paymentsdata = ["--選択--", "支出", "収入"];
  const categoriesdata = ["--選択--", "水道代", "その他"];
  const methodsdata = ["現金", "クレジット", "paypay"];

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
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddLists();
        }}
      >
        <label>購入日時</label>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          locale="ja"
          onChange={(selectedDate) => setDate(selectedDate || Today)}
        />

        <label>収支</label>
        <select
          value={paymentsItem}
          onChange={(e) => setPaymentsItem(e.target.value)}
        >
          {paymentsdata.map((payment) => (
            <option key={payment} value={payment}>
              {payment}
            </option>
          ))}
        </select>

        <label>勘定科目</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoriesdata.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>支払い方法</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          {methodsdata.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

        <label>金額</label>
        <input type="number" onChange={(e) => setAmount(e.target.value)} />

        {/* <label>税率</label>
        <button>10%</button>
        <button>なし</button> */}

        <label>備考</label>
        <textarea
          id="textarea"
          placeholder="備考"
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
        <button type="submit">登録する</button>
      </form>
    </>
  );
};

export default RegisterForm;
