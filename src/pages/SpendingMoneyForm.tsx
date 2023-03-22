import { css } from "@emotion/react";
import RegisterForm from "../components/RegisterForm";

const pageArea = css`
  padding: 50px 1% 100px 200px;
  h2{
    font-weight: 700;
  }
`;
const SpendingMoneyForm = () => {
  return (
    <div className="pageArea" css={pageArea}>
      <h2>収支登録</h2>
      <RegisterForm />
    </div>
  );
};

export default SpendingMoneyForm;
