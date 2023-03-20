import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
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
    </>
  );
};

export default SideBar;
