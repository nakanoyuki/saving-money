import { css } from "@emotion/react";

const pageArea = css`
  padding: 50px 1% 100px 200px;
  h2 {
    font-weight: 700;
  }
`;

const Home = () => {
  return (
    <div className="pageArea" css={pageArea}>
      ホーム
    </div>
  );
};

export default Home;
