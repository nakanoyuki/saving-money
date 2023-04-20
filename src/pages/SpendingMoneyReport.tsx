import TotalTable from "../components/paymentTable/TotalTable";
import { useExpensePostList, useIncomePostList } from "../hooks/usePostList";

const SpendingMoneyReport = () => {
  const { expensePostList } = useExpensePostList();
  const { incomePostList } = useIncomePostList();
  return (
    <div className="pageArea">
      <h2>収支レポート</h2>
      <TotalTable expensePostList={expensePostList} incomePostList={incomePostList}/>
    </div>
  );
};

export default SpendingMoneyReport;
