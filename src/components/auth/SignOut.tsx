import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";

const SignOut = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default SignOut;
