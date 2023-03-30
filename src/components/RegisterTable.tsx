import React from "react";
import uuid from "react-uuid";
import { format } from "date-fns";
import { List } from "../type/type";
import { useAuthContext } from "../feature/auth/provider/AuthProvider";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
      <TableContainer
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 900,
          background: "#fff",
          fontSize: 18
        }}
      >
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontSize: 14}} >取引日</TableCell>
              <TableCell sx={{fontSize: 14}}>金額</TableCell>
              <TableCell sx={{fontSize: 14}}>収支</TableCell>
              <TableCell sx={{fontSize: 14}}>カテゴリー</TableCell>
              <TableCell sx={{fontSize: 14}}>支払い方法</TableCell>
              <TableCell sx={{fontSize: 14}}>備考</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterPostsByEmail().map(
              ({
                date,
                amount,
                paymentsItem,
                category,
                method,
                memo,
                userId,
              }) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell sx={{fontSize: 14}}>{format(date.toDate(), "yy.M.d")}</TableCell>
                    <TableCell sx={{fontSize: 14}}>{amount}</TableCell>
                    <TableCell sx={{fontSize: 14}}>{paymentsItem}</TableCell>
                    <TableCell sx={{fontSize: 14}}>{category}</TableCell>
                    <TableCell sx={{fontSize: 14}}>{method}</TableCell>
                    <TableCell sx={{fontSize: 14}}>{memo}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RegisterTable;
