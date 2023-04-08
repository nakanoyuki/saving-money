import React, { useState } from "react";
import uuid from "react-uuid";
import { format } from "date-fns";
import { ExpenseIncome } from "../../type/type";
import { auth } from "../../firebase";
import { month, monthlists } from "../../util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { groupByMonth } from "../../util";

const TotalTable = ({
  expensePostList,
  incomePostList,
}: {
  expensePostList: ExpenseIncome[];
  incomePostList: ExpenseIncome[];
}) => {

  const [selectmonth, setSelectMonth] = useState(month);
  const groups = groupByMonth(expensePostList, incomePostList);

  const incomeAmounts = incomePostList.map((incomePost) =>
    Number(incomePost.amount)
  );
  const incomeTotal = incomeAmounts.reduce(
    (prev, current) => prev + current,
    0
  );
  const expenseAmounts = expensePostList.map((expensePost) =>
    Number(expensePost.amount)
  );
  const expenseTotal = expenseAmounts.reduce(
    (prev, current) => prev + current,
    0
  );

  const spendingTotal = () => {
    if (incomeTotal - expenseTotal >= 1) {
      return "+" + (incomeTotal - expenseTotal);
    } else {
      return incomeTotal - expenseTotal;
    }
  };

  return (
    <>
      {/* <li value={month}>{month}</li>
      {monthlists.map((month) => (
        <li value={month} key={month}>
          {month}
        </li>
      ))} */}

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
              <TableCell sx={{ fontSize: 14 }}>合計</TableCell>
              <TableCell sx={{ fontSize: 14 }}>収入</TableCell>
              <TableCell sx={{ fontSize: 14 }}>支出</TableCell>
            </TableRow>
          </TableHead>
          {Object.keys(groups).map((month) => (
            <TableBody>
              {groups[month].map(({ date, amount}) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell sx={{ fontSize: 14 }}>
                      {format(date.toDate(), "yyyy.M")}
                    </TableCell>
                    <TableCell sx={{ fontSize: 14 }}>{amount}</TableCell>
                    <TableCell sx={{ fontSize: 14 }}>{amount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalTable;
