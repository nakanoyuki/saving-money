import uuid from "react-uuid";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { usePostList } from "../hooks/usePostList";
import { paymentsdata } from "../api/data";

const Home = () => {
  const { postList } = usePostList();

  const now = new Date();
  const month = now.getMonth() + 1;

  const currentLists = postList.filter((post) => {
    return format(post.date.toDate(), "M月") === `${month}月`;
  });

  console.log(currentLists);

  // const calc = ({
  //   amount,
  //   paymentsItem,
  // }: {
  //   amount: number;
  //   paymentsItem: string;
  // }) => {
  //   const [income, expense] = paymentsdata;
  //   return currentLists.
  // };

  return (
    <>
      <p>今月({format(now, "yyyy年M月")})の収支</p>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 14 }}>金額</TableCell>
              <TableCell sx={{ fontSize: 14 }}>収支</TableCell>
              <TableCell sx={{ fontSize: 14 }}>取引日</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLists.length > 0 ? (
              currentLists.map(({ date, amount, paymentsItem, category }) => {
                return (
                  <>
                    <TableRow key={uuid()}>
                      <TableCell sx={{ fontSize: 14 }}>
                        ¥{amount.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {paymentsItem}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }}>
                        {format(date.toDate(), "M/d")}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })
            ) : (
              <>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        データがありません
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
