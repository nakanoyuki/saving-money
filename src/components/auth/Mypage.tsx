import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";

const Mypage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <>
      {!user ? (
        <Navigate to="/login/" />
      ) : (
        <>
          <h1>マイページ</h1>
          <p>{user?.email}</p>
          <button onClick={logout}>ログアウト</button>
        </>
      )}
    </>
  );
};

export default Mypage;
