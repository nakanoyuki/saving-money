import React from "react";
import uuid from "react-uuid";
import { format } from "date-fns";
import { List } from "../type/type";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";

const RegisterTable = ({ postList }: List) => {
  /**
   * 現在のユーザーのemailと一致する投稿を表示する。
   */
  const filterPostsByEmail = () => {
    const currentUserEmail = auth.currentUser?.email;
    return postList.filter((post) => post.userId === currentUserEmail);
  };
  return (
    <>
      <ul>
        {filterPostsByEmail().map(
          ({ date, amount, paymentsItem, category, method, memo, userId }) => {
            return (
              <li key={uuid()}>
                {format(date.toDate(), "yy.0M.d")}
                <p>{amount}</p>
                <p>{paymentsItem}</p>
                <p>{category}</p>
                <p>{method}</p>
                <p>{memo}</p>
                <p>{userId}</p>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
};

export default RegisterTable;
