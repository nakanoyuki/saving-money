import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import HowtoUse from "./components/HowtoUse";
import NoMatch from "./components/NoMatch";
import SpendingMoneyForm from "./components/SpendingMoneyForm";
import SpendingMoneyTable from "./components/SpendingMoneyTable";
import SpendingMoneyReport from "./components/SpendingMoneyReport";
import Header from "./components/Header";
import Login from "./components/account/Login";
import SignUp from "./components/account/SignUp";
import Mypage from "./components/account/Mypage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/" element={<Home />} />
        <Route path="/howtouse" element={<HowtoUse />} />
        <Route path="/spendingmoneyform" element={<SpendingMoneyForm />} />
        <Route path="/spendingmoneytable" element={<SpendingMoneyTable />} />
        <Route path="/spendingreport" element={<SpendingMoneyReport />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
