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
      {children}
      <Footer />
    </>
  );
};

export default LayoutAuth;
