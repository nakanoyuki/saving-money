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


export const usePostList = () => {
  const [incomepostList, setIncomePostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "incomelists") as CollectionReference<FormType>;
      const data = await getDocs(query(listsRef, orderBy("date", "desc")));
      setIncomePostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLists();
  }, []);

  return { incomepostList };
};
