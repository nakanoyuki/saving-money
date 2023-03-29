import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { Button } from "@mui/material";

const SignOut = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <>
      <Button
        sx={{
          color: "#4169e1",
          fontSize: "14px",
          fontWeight: "600",
          ml: "4px",
        }}
        onClick={logout}
      >
        ログアウト
      </Button>
    </>
  );
};

export default SignOut;
