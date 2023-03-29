import React from "react";
import uuid from "react-uuid";
import { format } from "date-fns";
import { List } from "../type/type";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const RegisterTable = ({ postList }: List) => {
  const { user } = useAuthContext();
  const auth = getAuth();
  return (
    <>
        <ul>
          {postList.map(
            ({ date, amount, paymentsItem, category, method, memo }) => {
              return (
                <li key={uuid()}>
                  {format(date.toDate(), "yy.0M.d")}
                  <p>{amount}</p>
                  <p>{paymentsItem}</p>
                  <p>{category}</p>
                  <p>{method}</p>
                  <p>{memo}</p>
                  <p>{user?.email}</p>
                </li>
              );
            }
          )}
        </ul>
    </>
  );
};

export default RegisterTable;
