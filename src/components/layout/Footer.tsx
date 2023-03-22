import { css } from "@emotion/react";


const footercenter=css`
  text-align: center;
  border-top: solid 1px #d9d9d9;
  padding: 10px 0;
`
const Footer = () => {
  return (
    <div css={footercenter}>Powered by Nakano</div>
  )
}

export default Footer