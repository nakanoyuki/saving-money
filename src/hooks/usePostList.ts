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
import { startOfMonth, endOfMonth ,subMonths} from "date-fns";

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
const now = new Date();
const startDate = startOfMonth(subMonths(now, 11));
const endDate = endOfMonth(now);
export const useIncomePostList = () => {

  const [incomePostList, setIncomePostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          where("paymentsItem", "==", "収入"),
          where("date", ">=", startDate),
          where("date", "<=", endDate)
        )
      );
      setIncomePostList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getLists();
  }, []);

  return { incomePostList };
};
export const useExpensePostList = () => {
  const [expensePostList, setExpensePostList] = useState<FormType[]>([]);
  useEffect(() => {
    const getLists = async () => {
      const listsRef = collection(db, "lists") as CollectionReference<FormType>;
      const data = await getDocs(
        query(
          listsRef,
          where("uid", "==", auth.currentUser?.uid),
          where("paymentsItem", "==", "支出"),
          where("date", ">=", startDate),
          where("date", "<=",endDate)
        )
      );
      setExpensePostList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getLists();
  }, []);

  return { expensePostList };
};