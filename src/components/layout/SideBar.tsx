import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";

const sideBar = css`
  background-color: rgb(61, 74, 79);
  width: 135px;
  height: 100%;
  margin-top: 50px;
  position: fixed;
  z-index: 1000;
  top: 0;
  padding: 30px 1%;
  a {
    color: #fff;
    display: block;
    margin: 0 0 20px;
    font-size: 1.4rem;
  }
`;

const SideBarItem = ({ link, content }: { link: string; content: string }) => {
  return (
    <NavLink
      className={({ isActive, isPending }) => {
        return isActive ? "active" : isPending ? "pending" : "";
      }}
      to={link}
    >
      {content}
    </NavLink>
  );
};

const SideBar = () => {
  return (
    <div className="sideBar" css={sideBar}>
      <SideBarItem link="/" content="ホーム"/>
      <SideBarItem link="/howtouse" content="使い方"/>
      <SideBarItem link="/spendingmoneyform" content="収支入力"/>
      <SideBarItem link="/spendingmoneytable" content="収支一覧"/>
      <SideBarItem link="/spendingreport" content="収支レポート"/>
    </div>
  );
};

export default SideBar;
