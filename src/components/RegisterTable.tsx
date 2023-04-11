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
import { month, monthlists } from "../../src/util";
import ReactPaginate from "react-paginate";
import { css } from "@emotion/react";

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
const RegisterTable = ({ postList }: List) => {
  // ページネーション
  const [selectmonth, setSelectMonth] = useState(month);
  const [payment, setPayment] = useState("");

  const filterMatchMonth = () => {
    return postList.filter(
      (post) => format(post.date.toDate(), "yyyy年M月") === selectmonth
    );
  };
  const filterPayments = () => {
    if (!payment) return filterMatchMonth();
    return filterMatchMonth().filter((post) => post.paymentsItem === payment);
  };
  const itemsPerPage = 6;
  const [itemsOffset, setItemsOffset] = useState(0);
  const endOffset = itemsOffset + itemsPerPage;
  const currentAlbums = filterPayments().slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(filterMatchMonth().length / itemsPerPage);
  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % filterMatchMonth().length;
    setItemsOffset(newOffset);
  };
  const paymentsdata = ["支出", "収入"];
  return (
    <>
      <Select
        value={selectmonth}
        onChange={(event) => setSelectMonth(event.target.value)}
        sx={{ background: "#ffffff", width: "300px" }}
      >
        <MenuItem value={month}>{month}</MenuItem>
        {monthlists.map((month) => (
          <MenuItem value={month} key={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={payment}
        onChange={(event) => setPayment(event.target.value)}
        sx={{ background: "#ffffff", width: "300px" }}
      >
        <MenuItem disabled>--選択--</MenuItem>
        {paymentsdata.map((payment) => (
          <MenuItem key={payment} value={payment}>
            {payment}
          </MenuItem>
        ))}
      </Select>

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
            {currentAlbums.map(
              ({ date, amount, paymentsItem, category, method, memo }) => {
                return (
                  <TableRow key={uuid()}>
                    <TableCell sx={{ fontSize: 14 }}>
                      {format(date.toDate(), "yyyy.M.d")}
                    </TableCell>
                    <TableCell sx={{ fontSize: 14 }}>
                      ¥{amount.toLocaleString()}
                    </TableCell>
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
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          css={pagenation}
          breakLabel="..."
          nextLabel="&gt;"
          previousLabel="&lt;"
        />
      </TableContainer>
    </>
  );
};

export default RegisterTable;
