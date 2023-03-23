import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

type List = {
  id: number;
  value: string;
};
const RegisterForm = () => {
  const Today = new Date();
  const [date, setDate] = useState(Today);
  registerLocale("ja", ja);

  const [amount, setAmount] = useState<string>("");
  const [lists, setLists] = useState<List[]>([]);

  const handleSubmit = () => {
    if (!amount) return;

    const newList: List = {
      id: 1,
      value: amount,
    };

    setLists([newList, ...lists]);
    setAmount("");
  };

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
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
      <select name="" id="">
        <option value="" label="--選択--" />
        <option value="支出" label="支出" />
        <option value="収入" label="収入" />
      </select>

      {/* <label>カテゴリー</label>
      <input type="text" placeholder="カテゴリー"/> */}

      <label>勘定科目</label>
      <select name="" id="">
        <option value="" label="--勘定科目--" />
        <option value="交通費" label="交通費" />
        <option value="水道代" label="水道代" />
      </select>

      <label>支払い方法</label>
      <select name="" id="">
        <option value="" label="--支払い方法--" />
        <option value="現金" label="現金" />
        <option value="クレジット" label="クレジット" />
        <option value="paypay" label="paypay" />
      </select>

      <label>金額</label>
      <input type="text" value={amount} onChange={(e) => HandleChange(e)}/>

      <label>税率</label>
      <button>10%</button>
      <button>なし</button>

      <label>備考</label>
      <textarea name="" placeholder="備考"></textarea>

      <button>リセットする</button>
      <button onSubmit={handleSubmit}>登録する</button>
    </form>
  );
};

export default RegisterForm;
