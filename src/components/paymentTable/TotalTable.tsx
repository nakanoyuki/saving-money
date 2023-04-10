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
    return { income, expense, sum: income - expense };
  };
  const labels = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const sumAndMonth = Object.keys(groups).map((month) => {
    const { sum } = getAmount(groups, month);
    
    return { sum, month };
  });

  return (
    <>
      {Object.keys(groups).map((month) => {
        const { income, expense, sum } = getAmount(groups, month);
        return (
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
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    年月
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    合計
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    収入
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    支出
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow key={uuid()}>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    {month}
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    {sum.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    {income.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, width: "20%" }}>
                    {expense.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </>
  );
};

export default TotalTable;
