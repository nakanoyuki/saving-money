import { css } from "@emotion/react";

const pageArea = css`
  padding: 30px 1% 100px 200px;
`;
const SpendingMoneyReport = () => {
  return (
    <div className="pageArea" css={pageArea}>
      <h2>収支登録</h2>
    </div>
  );
};

export default SpendingMoneyReport;
