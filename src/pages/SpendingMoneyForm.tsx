import { css } from "@emotion/react";
import { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

import RegisterForm from "../components/RegisterForm";

const SpendingMoneyForm = () => {
  registerLocale("ja", ja);

  return (
      <div className="pageArea">
        <h2>収支登録</h2>
        <RegisterForm />
      </div>
  );
};

export default SpendingMoneyForm;
