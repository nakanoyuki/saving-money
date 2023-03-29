import { useEffect } from "react";
import { atom, useRecoilState } from "recoil"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../../firebase"
import { recoilPersist } from "recoil-persist";

type UserState = User | null;

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : sessionStorage
});

export const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom]
});

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    // const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {

      setUser(user);
    });
    // }, [setUser]);
  }, []);

  return user;
};