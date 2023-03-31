import { css } from "@emotion/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import ChartGraph from "../components/ChartGraph";
import { db } from "../firebase";

const pageArea = css`
  padding: 30px 1% 100px 200px;
`;
const SpendingMoneyReport = () => {
  return (
    <div className="pageArea">
      <h2>収支レポート</h2>
      <ChartGraph />
    </div>
  );
};

export default SpendingMoneyReport;
