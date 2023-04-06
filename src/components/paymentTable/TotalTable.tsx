import React, { useState } from "react";
import uuid from "react-uuid";
import { format } from "date-fns";
import { ExpenseIncome } from "../../type/type";
import { auth } from "../../firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const TotalTable = ({ expensepostList, incomepostList }: ExpenseIncome) => {
  const expenseAmounts = expensepostList.map((expensepost) =>
    Number(expensepost.amount)

  );
  const expenseTotal = expenseAmounts.reduce(
    (prev, current) => prev + current,
    0
  );

  const incomeAmounts = incomepostList.map((incomepost) =>
    Number(incomepost.amount)
  );
  const incomeTotal = incomeAmounts.reduce(
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
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontSize: 14 }}>
                {spendingTotal().toLocaleString()}
                <span> 円</span>
              </TableCell>
              <TableCell sx={{ fontSize: 14 }}>
                + {incomeTotal.toLocaleString()}
                <span> 円</span>
              </TableCell>
              <TableCell sx={{ fontSize: 14 }}>
                - {expenseTotal.toLocaleString()}
                <span> 円</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalTable;
