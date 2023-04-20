import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/auth/AuthProvider";
import SignOut from "../components/auth/SignOut";

const Mypage = () => {
  const { user } = useAuthContext();

  return (
    <>
      {!user ? (
        <Navigate to="/login/" />
      ) : (
        <>
          <h1>マイページ</h1>
          <p>{user?.email}</p>
          <SignOut />
        </>
      )}
    </>
  );
};

export default Mypage;
