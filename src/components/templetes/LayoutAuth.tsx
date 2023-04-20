import Footer from "../layout/Footer";
import { css } from "@emotion/react";
import { ChildrenProps } from "../../type/type";
import HeaderTop from "../layout/HeaderTop";

const mainheight = css`
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LayoutAuth = (props: ChildrenProps) => {
  const { children } = props;
  return (
    <>
      <HeaderTop />
      <main css={mainheight}>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutAuth;
