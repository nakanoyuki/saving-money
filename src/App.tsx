import { useState } from "react";
import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import HowtoUse from "./components/HowtoUse";
import NoMatch from "./components/NoMatch";
import SpendingMoneyForm from "./components/SpendingMoneyForm";
import SpendingMoneyTable from "./components/SpendingMoneyTable";
import SpendingMoneyReport from "./components/SpendingMoneyReport";

function App() {
  return (
    <div className="App">
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
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howtouse" element={<HowtoUse />} />
        <Route path="/spendingmoneyform" element={<SpendingMoneyForm />} />
        <Route path="/spendingmoneytable" element={<SpendingMoneyTable/>} />
        <Route path="/spendingreport" element={<SpendingMoneyReport />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
