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
  TextField,
} from "@mui/material";
import { useState } from "react";
import { month, monthlists } from "../../src/util";
import ReactPaginate from "react-paginate";
import { Box } from "@mui/system";
import { css } from "@emotion/react";

const sample = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 20px 6px;
  margin-top:2rem;

  .previous,
  .next {
    display: inline-flex;
    align-items: center;
    border-radius: 30px;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    height: 40px;
    width: 40px;
  }
`;
const RegisterTable = ({ postList }: List) => {
  // ページネーション
  const [selectmonth, setSelectMonth] = useState(month);
  const filterMatchMonth = () => {
    return postList.filter(
      (post) => format(post.date.toDate(), "yyyy年M月") === selectmonth
    );
  };
  const itemsPerPage = 6;
  const [itemsOffset, setItemsOffset] = useState(0);
  const endOffset = itemsOffset + itemsPerPage;
  const currentAlbums = filterMatchMonth().slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(filterMatchMonth().length / itemsPerPage);
  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % filterMatchMonth().length;
    setItemsOffset(newOffset);
  };
  return (
    <>
      <Select
        value={selectmonth}
        onChange={(event) => setSelectMonth(event.target.value)}
        sx={{background:"#ffffff",width:"300px"}}
      >
        <MenuItem value={month}>{month}</MenuItem>
        {monthlists.map((month) => (
          <MenuItem value={month} key={month}>
            {month}
          </MenuItem>
        ))}
      </Select>

      <TableContainer
        sx={{
          p: "3rem",
          mt:"1rem",
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
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          css={sample}
          breakLabel="..."
          nextLabel=">" previousLabel="<"
        />
      </TableContainer>
    </>
  );
};

export default RegisterTable;
