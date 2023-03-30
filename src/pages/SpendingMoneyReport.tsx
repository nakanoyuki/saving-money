import { css } from "@emotion/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase";

const pageArea = css`
  padding: 30px 1% 100px 200px;
`;
const SpendingMoneyReport = () => {
  return (
    <div className="pageArea">
      <h2>収支一覧</h2>
    </div>
  );
};

export default SpendingMoneyReport;
