import { css } from "@emotion/react";
import { usePostList } from "../hooks/usePostList";

import RegisterTable from "../components/RegisterTable";

const SpendingMoneyTable = () => {
  const { incomepostList } = usePostList();

  return (
    <div className="pageArea">
      <RegisterTable postList={incomepostList} />
    </div>
  );
};

export default SpendingMoneyTable;
