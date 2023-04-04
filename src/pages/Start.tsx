import { Button, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Navigate } from "react-router-dom";
import LayoutTop from "../components/templetes/LayoutTop";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";

const Start = () => {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        <>
          <Navigate to="/home" />
        </>
      ) : (
        <LayoutTop>
          <Container>
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
                px: 3,
                mt: 2,
              }}
            >
              新規アカウントを作成する
            </Button>
          </Container>
        </LayoutTop>
      )}
    </>
  );
};

export default Start;
