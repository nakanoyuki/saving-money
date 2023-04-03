import uuid from "react-uuid";
import { format } from "date-fns";
import { List } from "../type/type";
import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { month, monthlists } from "../../src/util";

const RegisterTable = ({ postList }: List) => {
  const [selectmonth, setSelectMonth] = useState(month);

  const filterMatchMonth = () => {
    return postList.filter(
      (post) => format(post.date.toDate(), "yyyy年M月") === selectmonth
    );
  };

  return (
    <>
      <select
        value={selectmonth}
        onChange={(event) => setSelectMonth(event.target.value)}
      >
        <option value={month}>{month}</option>
        {monthlists.map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>

      <TableContainer
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 900,
          background: "#fff",
          fontSize: 18,
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
            {filterMatchMonth().map(
              ({ date, amount, paymentsItem, category, method, memo }) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell sx={{ fontSize: 14 }}>
                      {format(date.toDate(), "yyyy.M.d")}
                    </TableCell>
                    <TableCell sx={{ fontSize: 14 }}>{amount}</TableCell>
                    <TableCell sx={{ fontSize: 14 }}>{paymentsItem}</TableCell>
                    <TableCell sx={{ fontSize: 14 }}>{category}</TableCell>
                    <TableCell sx={{ fontSize: 14 }}>{method}</TableCell>
                    <TableCell sx={{ fontSize: 14 }}>{memo}</TableCell>
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
