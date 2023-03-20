import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import HowtoUse from "./components/HowtoUse";
import NoMatch from "./components/NoMatch";
import SpendingMoneyForm from "./components/SpendingMoneyForm";
import SpendingMoneyTable from "./components/SpendingMoneyTable";
import SpendingMoneyReport from "./components/SpendingMoneyReport";
import Header from "./components/layout/Header";
import Login from "./components/account/Login";
import SignUp from "./components/account/SignUp";
import Mypage from "./components/account/Mypage";
import { AuthProvider } from "./feature/auth/provider/AuthProvider";
import DefaultLayout from "./components/templetes/DefaultLayout";
import LayoutAuth from "./components/templetes/DefaultLayout";

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<Home />} />
          <Route path="/howtouse" element={<HowtoUse />} />
          <Route path="/spendingmoneyform" element={<SpendingMoneyForm />} />
          <Route path="/spendingmoneytable" element={<SpendingMoneyTable />} />
          <Route path="/spendingreport" element={<SpendingMoneyReport />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
