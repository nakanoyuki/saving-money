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
        <Link to="/home">
          <img src={logo} alt="収支管理APP" width="100" height="42"/>
        </Link>
        <div>
          <Button
            href="/login"
            sx={{
              color: "#4169e1",
              fontSize: " 1.4rem",
              fontWeight: "600",
              px: 3,
            }}
          >
            ログイン
          </Button>
          <Button
            href="/signup"
            sx={{
              border: "solid 2px #4169e1",
              borderRadius: "50px",
              color: "#4169e1",
              fontSize: " 1.4rem",
              fontWeight: "600",
              px: 3,
            }}
          >
            新規アカウントを作成する
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderTop;
