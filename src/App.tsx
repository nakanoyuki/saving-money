import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import HowtoUse from "./pages/HowtoUse";
import NoMatch from "./components/NoMatch";
import SpendingMoneyForm from "./pages/SpendingMoneyForm";
import SpendingMoneyTable from "./pages/SpendingMoneyTable";
import SpendingMoneyReport from "./pages/SpendingMoneyReport";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Mypage from "./pages/Mypage";
import { AuthProvider } from "./hooks/auth/AuthProvider";
import DefaultLayout from "./components/templetes/DefaultLayout";

/** @jsxImportSource @emotion/react */
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";
import Start from "./pages/Start";

function App() {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}

          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
          html {
            font-size: 62.5%;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            -webkit-font-feature-settings: "palt";
            font-feature-settings: "palt";
            word-break: break-all;
          }

          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            font-size: 1.6rem;
            line-height: 1.3;
            color: rgb(0, 0, 0);
            font-weight: 300;
            width: 100%;
            max-width: 100%;
            min-width: 320px;
            overflow: auto;
            padding: 0px;
            margin: 0px;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route element={<DefaultLayout />}>
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/howtouse" element={<HowtoUse />} />
            <Route path="/spendingmoneyform" element={<SpendingMoneyForm />} />
            <Route
              path="/spendingmoneytable"
              element={<SpendingMoneyTable />}
            />
            <Route path="/spendingreport" element={<SpendingMoneyReport />} />
            <Route path="*" element={<NoMatch />} />
          </Route> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
