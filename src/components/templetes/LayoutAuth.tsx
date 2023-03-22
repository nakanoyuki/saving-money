import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
type Props = {
  children: React.ReactNode;
};
const LayoutAuth = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer />
    </>
  );
};

export default LayoutAuth;
