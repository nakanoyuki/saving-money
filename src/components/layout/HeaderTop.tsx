import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import logo from "../../img/logo.png";
import { AppBar, Button, Toolbar } from "@mui/material";

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 70px;
  width: 100%;
`;
const HeaderTop = () => {
  return (
    <AppBar>
      <Toolbar css={header}>
        <Link to="/">
          <img src={logo} alt="収支管理APP" width="100" />
        </Link>

        <Button
          href="/login"
          sx={{
            color: "#4169e1",
            fontSize: "14px",
            fontWeight: "600",
            ml: "4px",
          }}
        >
          ログイン
        </Button>
        <Button
          href="/signup"
          sx={{
            color: "#4169e1",
            fontSize: "14px",
            fontWeight: "600",
            ml: "4px",
          }}
        >
          新規アカウントを作成する
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTop;
