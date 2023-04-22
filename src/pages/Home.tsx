import uuid from "react-uuid";
import { format } from "date-fns";
import { ExpenseIncome, List, TotalTableProps } from "../type/type";
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
import { groupByMonth, month, monthlists } from "../util";
import ReactPaginate from "react-paginate";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { selectpaymentsdata } from "../api/data";
import { usePostList } from "../hooks/usePostList";

const Home = ({ expensePostList, incomePostList }: TotalTableProps) => {
  const { postList } = usePostList();

  const now = new Date();
  const month = now.getMonth() + 1;

  const currentLists = postList.filter((post) => {
    return format(post.date.toDate(), "M月") === `${month}月`;
  });


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
    // <>
    //   {currentLists.length > 0 ? (
    //     currentLists.map(
    //       ({ date, amount, paymentsItem, category, method, memo }) => {
    //         return (
    //           <>
    //             <p>今月({format(date.toDate(), "yyyy年M月")})の収支</p>
    //             <TableContainer>
    //               <Table>
    //                 <TableHead>
    //                   <TableRow>
    //                     <TableCell sx={{ fontSize: 14 }}>金額</TableCell>
    //                     <TableCell sx={{ fontSize: 14 }}>収支</TableCell>
    //                     <TableCell sx={{ fontSize: 14 }}>カテゴリー</TableCell>
    //                   </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                   <TableRow key={uuid()}>
    //                     <TableCell sx={{ fontSize: 14 }}>
    //                       ¥{amount.toLocaleString()}
    //                     </TableCell>
    //                     <TableCell sx={{ fontSize: 14 }}>
    //                       {paymentsItem}
    //                     </TableCell>
    //                     <TableCell sx={{ fontSize: 14 }}>{category}</TableCell>
    //                   </TableRow>
    //                 </TableBody>
    //               </Table>
    //             </TableContainer>
    //           </>
    //         );
    //       }
    //     )
    //   ) : (
    //     <>
    //       <Table>
    //         <TableBody>
    //           <TableRow>
    //             <TableCell colSpan={6} align="center">
    //               データがありません
    //             </TableCell>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </>
    //   )}
    // </>
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

export default Home;
