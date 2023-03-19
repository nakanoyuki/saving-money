import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";


const Home = () => {
  return (
    <div>
      <Header />
      <div>
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
        <NavLink
          className={({ isActive, isPending }) => {
            return isActive ? "active" : isPending ? "pending" : "";
          }}
          to="/mypage"
        >
          マイページ
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
