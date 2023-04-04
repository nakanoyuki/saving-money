import Footer from "../layout/Footer";
import HeaderTop from "../layout/HeaderTop";
import { css } from "@emotion/react";
import { ChildrenProps } from "../../type/type";

const mainheight = css`
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LayoutTop = (props: ChildrenProps) => {
  const { children } = props;
  return (
    <>
      <HeaderTop />
      <main css={mainheight}>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutTop;
