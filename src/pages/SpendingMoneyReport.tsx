import { css } from "@emotion/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import ChartGraph from "../components/ChartGraph";
import TotalTable from "../components/paymentTable/TotalTable";
import { db } from "../firebase";
import { useExpensePostList, useIncomePostList } from "../hooks/usePostList";

const SpendingMoneyReport = () => {
  const { expensePostList } = useExpensePostList();
  const { incomePostList } = useIncomePostList();
  return (
    <div className="pageArea">
      <h2>収支レポート</h2>
      {/* <ChartGraph expensepostList={expensepostList} incomepostList={incomepostList}/> */}
      <TotalTable expensePostList={expensePostList} incomePostList={incomePostList}/>
    </div>
  );
};

export default SpendingMoneyReport;
