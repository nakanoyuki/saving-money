import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { css } from "@emotion/react";

type Props = {
  children: React.ReactNode;
};

const mainheight=css`
  height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LayoutAuth = (props: Props) => {
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
