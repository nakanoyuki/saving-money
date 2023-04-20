import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/AuthProvider";
import { css } from "@emotion/react";
import SignOut from "../auth/SignOut";
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
const Header = () => {
  const { user } = useAuthContext();

  return (
    <AppBar>
      <Toolbar css={header}>
        <Link to="/home">
          <img src={logo} alt="収支管理APP" width={100} height={42} />
        </Link>

        {user && (
          <div>
            <Button
              href="/mypage"
              sx={{
                border: "solid 2px #4169e1",
                borderRadius: "50px",
                color: "#4169e1",
                fontSize: " 1.4rem",
                fontWeight: "600",
                px: 3,
              }}
            >
              マイページ
            </Button>
            <SignOut />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
