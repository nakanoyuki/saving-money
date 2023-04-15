import { Button, Typography, Box } from "@mui/material";
import { Container, css } from "@mui/system";
import LayoutTop from "../components/templetes/LayoutTop";
import { useAuthContext } from "../hooks/auth/AuthProvider";
import kvImg from "../img/kvImg.svg";

const kvArea = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Start = () => {
  return (
    <>
      <LayoutTop>
        <Container>
          <div css={kvArea}>
            <Box
              sx={{
                width: "50%",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  border: "#4169e1",
                  borderRadius: "5rem",
                  fontSize: "4.6rem",
                  lineHeight: "6rem",
                  mb: 1,
                }}
              >
                日々の家計簿を
                <br />
                このアプリで管理
              </Typography>
              <p css={{ fontSize: "1.6rem" }}>
                Spending Moneyは日々の収支の記録を記録できるアプリです。
              </p>
              <Button
                href="/signup"
                sx={{
                  border: "solid 2px #4169e1",
                  background: "#ffffff",
                  borderRadius: "50px",
                  fontSize: " 1.6rem",
                  fontWeight: "600",
                  px: 3,
                  mt: 2,
                }}
              >
                新規アカウントを作成する
              </Button>
            </Box>
            <Box
              sx={{
                width: "50%",
              }}
            >
              <img src={kvImg} alt="KV" width="434" />
            </Box>
          </div>
        </Container>
      </LayoutTop>
    </>
  );
};

export default Start;
