import React from "react";
import uuid from "react-uuid";
import { format } from "date-fns";
import { List } from "../type/type";

const RegisterTable = ({ postList }: List) => {
  return (
    <div>
      {postList.map((post) => {
        return (
          <li key={uuid()}>
            {format(post.date.toDate(), "yy.0M.d")}
            <p>{post.amount}</p>
            <p>{post.paymentsItem}</p>
            <p>{post.category}</p>
            <p>{post.method}</p>
            <p>{post.memo}</p>
          </li>
        );
      })}
    </div>
  );
};

export default RegisterTable;
