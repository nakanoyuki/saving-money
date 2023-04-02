import { css } from "@emotion/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import ChartGraph from "../components/ChartGraph";
import ExpenseTable from "../components/paymentTable/TotalTable";
import { db } from "../firebase";
import { useExpensePostList, useIncomePostList } from "../hooks/usePostList";

const pageArea = css`
  padding: 30px 1% 100px 200px;
`;
const SpendingMoneyReport = () => {
  const { expensepostList } = useExpensePostList();
  const { incomepostList } = useIncomePostList();
  return (
    <div className="pageArea">
      <h2>収支レポート</h2>
      <ChartGraph expensepostList={expensepostList} incomepostList={incomepostList}/>
      合計
      <ExpenseTable expensepostList={expensepostList} incomepostList={incomepostList}/>
    </div>
  );
};

export default SpendingMoneyReport;
