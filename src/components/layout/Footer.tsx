import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

const footercenter = css`
  text-align: center;
  border-top: solid 1px #d9d9d9;
  padding: 10px 0;
  background: #fff;
`;
const imgSize = css`
  margin-left: 1rem;
`;
const Footer = () => {
  return (
    <footer css={footercenter}>
      {/* <Typography> */}
        <Link to="/home">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize:"1.2rem"
            }}
          >
            Powered by <img src={logo} css={imgSize} alt="収支管理APP" width="60" />
          </Box>
        </Link>
      {/* </Typography> */}
      {/* <Footer css={footercenter}>Powered by Nakano</Footer> */}
    </footer>
  );
};

export default Footer;
