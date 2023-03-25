import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { css } from "@emotion/react";
import { ChildrenProps } from "../../type/type";

const mainheight = css`
  height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LayoutAuth = (props: ChildrenProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main css={mainheight}>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutAuth;
