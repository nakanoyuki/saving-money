import { css } from "@emotion/react";

const pageArea = css`
  padding: 50px 1% 100px 200px;
  h2 {
    font-weight: 700;
  }
`;

const HowtoUse = () => {
  return (
    <div className="pageArea" css={pageArea}>HowtoUse</div>
  )
}

export default HowtoUse