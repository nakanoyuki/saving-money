import { usePostList } from "../hooks/usePostList";

import RegisterTable from "../components/RegisterTable";

const SpendingMoneyTable = () => {
  const { postList } = usePostList();

  return (
    <div className="pageArea">
      <RegisterTable postList={postList} />
    </div>
  );
};

export default SpendingMoneyTable;
