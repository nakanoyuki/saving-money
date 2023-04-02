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

const RegisterTable = ({ postList }: List) => {
  const selectMonth = () => {
    //日付→今月
    const today = new Date();
    // const nowtoday = new Date();
    const lastMonth1 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth2 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth3 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth4 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth5 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth6 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth7 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth8 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth9 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth10 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );
    const lastMonth11 = format(
      today.setMonth(today.getMonth() - 1),
      "yyyy年M月"
    );

    return {
      lastMonth1,
      lastMonth2,
      lastMonth3,
      lastMonth4,
      lastMonth5,
      lastMonth6,
      lastMonth7,
      lastMonth8,
      lastMonth9,
      lastMonth10,
      lastMonth11,
    };
  };
  const {
    lastMonth1,
    lastMonth2,
    lastMonth3,
    lastMonth4,
    lastMonth5,
    lastMonth6,
    lastMonth7,
    lastMonth8,
    lastMonth9,
    lastMonth10,
    lastMonth11,
  } = selectMonth();

  const today = new Date();
  const month = format(today, "yyyy年M月");
  const monthlists = [
    lastMonth1,
    lastMonth2,
    lastMonth3,
    lastMonth4,
    lastMonth5,
    lastMonth6,
    lastMonth7,
    lastMonth8,
    lastMonth9,
    lastMonth10,
    lastMonth11,
  ];
  const [selectmonth, setSelectMonth] = useState(month);

  const filterMatchMonth = () => {
    return postList.filter(
      (post) => format(post.date.toDate(), "yyyy年M月") === selectmonth
    );
  };

  console.log("month" + month);
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
