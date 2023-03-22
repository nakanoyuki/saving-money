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
const SideBar = () => {
  return (
    <div className="sideBar" css={sideBar}>
      <NavLink
        className={({ isActive, isPending }) => {
          return isActive ? "active" : isPending ? "pending" : "";
        }}
        to="/"
      >
        ホーム
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) => {
          return isActive ? "active" : isPending ? "pending" : "";
        }}
        to="/howtouse"
      >
        使い方
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) => {
          return isActive ? "active" : isPending ? "pending" : "";
        }}
        to="/spendingmoneyform"
      >
        収支入力
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) => {
          return isActive ? "active" : isPending ? "pending" : "";
        }}
        to="/spendingmoneytable"
      >
        収支一覧
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) => {
          return isActive ? "active" : isPending ? "pending" : "";
        }}
        to="/spendingreport"
      >
        収支レポート
      </NavLink>
    </div>
  );
};

export default SideBar;
