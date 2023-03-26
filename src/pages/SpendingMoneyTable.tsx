import { css } from "@emotion/react";
import { usePostList } from "../hooks/usePostList";

import RegisterTable from "../components/RegisterTable";

const pageArea = css`
  padding: 50px 1% 100px 200px;
  h2 {
    font-weight: 700;
  }
`;

const SpendingMoneyTable = () => {
  const { postList } = usePostList();

  return (
    <div className="pageArea" css={pageArea}>
      <RegisterTable postList={postList} />
    </div>
  );
};

export default SpendingMoneyTable;
