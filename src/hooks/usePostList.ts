import {
  collection,
  getDocs,
  CollectionReference,
  orderBy,
  query,
  where,
  startAt,
  endAt,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { FormType } from "../type/type";
import { auth } from "../firebase";

export const usePostList = () => {
  const [postList, setPostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          orderBy("date", "desc")
        )
      );
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLists();
  }, []);

  return { postList };
};
export const useIncomePostList = () => {
  const [incomepostList, setIncomePostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          where("paymentsItem", "==", "収入")
        )
      );
      setIncomePostList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getLists();
  }, []);

  return { incomepostList };
};
export const useExpensePostList = () => {
  const date = new Date()
  const [expensepostList, setExpensePostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          where("paymentsItem", "==", "支出"),
        )
      );
      setExpensePostList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getLists();
  }, []);

  return { expensepostList };
};
