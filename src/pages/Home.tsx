import uuid from "react-uuid";
import { format } from "date-fns";
import { List } from "../type/type";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { month, monthlists } from "../util";
import ReactPaginate from "react-paginate";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { selectpaymentsdata } from "../api/data";
import { usePostList } from "../hooks/usePostList";


const pagenation = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px 6px;
  margin-top: 3rem;
  li {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    border: solid 1px #1976d2;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    color: #1976d2;
    &.selected {
      background: #1976d2;
      color: #fff;
      cursor: pointer;
    }
    a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Home = () => {
  const { postList } = usePostList();

  const now = new Date();
  const month = now.getMonth() + 1;

  const currentLists = postList.filter((post) => {
    return format(post.date.toDate(), "M月") === `${month}月`;
  });

  return (
    <>
      <TableContainer
        sx={{
          p: "3rem",
          mt: "1rem",
          width: "100%",
          background: "#fff",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 14 }}>取引日</TableCell>
              <TableCell sx={{ fontSize: 14 }}>金額</TableCell>
              <TableCell sx={{ fontSize: 14 }}>収支</TableCell>
              <TableCell sx={{ fontSize: 14 }}>カテゴリー</TableCell>
              <TableCell sx={{ fontSize: 14 }}>支払い方法</TableCell>
              <TableCell sx={{ fontSize: 14 }}>備考</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLists.length > 0 ? (
              currentLists.map(
                ({ date, amount, paymentsItem, category, method, memo }) => {
                  return (
                    <TableRow key={uuid()}>
                      <TableCell sx={{ fontSize: 14 }}>
                        {format(date.toDate(), "yyyy年M月")}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        ¥{amount.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {paymentsItem}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{category}</TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{method}</TableCell>
                      <TableCell sx={{ fontSize: 14 }}>{memo}</TableCell>
                    </TableRow>
                  );
                }
              )
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  データがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
