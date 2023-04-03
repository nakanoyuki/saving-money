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
import { format } from "date-fns";

export const usePostList = () => {
  const [postList, setPostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          orderBy("date", "desc"),
        )
      );
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLists();
  }, []);

  return { postList };
};


export const useIncomePostList = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [incomepostList, setIncomePostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          where("paymentsItem", "==", "収入"),
          where('date', '>=',startOfMonth),
          where('date', '<=', endOfMonth)
        )
      );
      setIncomePostList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getLists();
  }, [startOfMonth]);

  return { incomepostList };
};
export const useExpensePostList = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [expensepostList, setExpensePostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          where("paymentsItem", "==", "支出"),
          where('date', '>=', startOfMonth),
          where('date', '<=', endOfMonth)
        )
      );
      setExpensePostList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getLists();
  }, [startOfMonth]);

  return { expensepostList };
};

