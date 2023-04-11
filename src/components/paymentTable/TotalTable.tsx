import uuid from "react-uuid";
import { ExpenseIncome } from "../../type/type";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { groupByMonth } from "../../util";

type TotalTableProps = {
  expensePostList: ExpenseIncome[];
  incomePostList: ExpenseIncome[];
};

const TotalTable = ({ expensePostList, incomePostList }: TotalTableProps) => {
  const groups = groupByMonth(expensePostList, incomePostList);
  const getAmount = (
    groups: { [key: string]: ExpenseIncome[] },
    month: string
  ) => {
    const calc = (type: string) => {
      return groups[month]
        .filter((group) => group.paymentsItem === type)
        .reduce((prev, current) => prev + current.amount, 0);
    };
    const income = calc("収入");
    const expense = calc("支出");
    const sum = income - expense;
    return {
      income,
      expense,
      sum,
      color: sum < 0 ? "#f44336" : "#1976d2",
      PlusMinussymbol: sum < 0 ? "-" : "+",
    };
  };

  return (
    <>
      <TableContainer
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          background: "#fff",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 14, width: "20%" }}>年月</TableCell>
              <TableCell sx={{ fontSize: 14, width: "20%" }}>合計</TableCell>
              <TableCell sx={{ fontSize: 14, width: "20%" }}>収入</TableCell>
              <TableCell sx={{ fontSize: 14, width: "20%" }}>支出</TableCell>
            </TableRow>
          </TableHead>
          {Object.keys(groups).map((month) => {
            const { income, expense, sum, color, PlusMinussymbol } = getAmount(
              groups,
              month
            );
            return (
              <TableBody>
                <TableRow key={uuid()}>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    {month}
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, width: "20%", color }}>
                    {PlusMinussymbol}¥{sum >= 0 ? sum.toLocaleString() : `${Math.abs(sum).toLocaleString()}`}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 14, width: "20%", color: "#1976d2" }}
                  >
                    ¥{income.toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 14, width: "20%", color: "#f44336" }}
                  >
                    ¥{expense.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalTable;
