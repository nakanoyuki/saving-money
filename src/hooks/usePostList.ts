import {
  collection,
  getDocs,
  CollectionReference,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { FormType } from "../type/type";
import { useRecoilState } from "recoil";
import { userState } from "../components/atoms/userState";

export const usePostList = () => {
  const [postList, setPostList] = useState<FormType[]>([]);
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(query(listsRef, orderBy("date", "desc")));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLists();
  }, []);

  return { postList };
};
