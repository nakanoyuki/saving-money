import uuid from "react-uuid";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { usePostList } from "../hooks/usePostList";

const Home = () => {
  const { postList } = usePostList();

  const now = new Date();
  const month = now.getMonth() + 1;

  const currentLists = postList.filter((post) => {
    return format(post.date.toDate(), "M月") === `${month}月`;
  });

  return (
    <>
      <Typography variant="h2" sx={{ fontSize: 18 }}>
        今月({format(now, "yyyy年M月")})の収支
      </Typography>

      <TableContainer
        sx={{
          mt: "2rem",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 14 }} align="center">
                金額
              </TableCell>
              <TableCell sx={{ fontSize: 14 }} align="center">
                収支
              </TableCell>
              <TableCell sx={{ fontSize: 14 }} align="center">
                取引日
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLists.length > 0 ? (
              currentLists.map(({ date, amount, paymentsItem }) => {
                return (
                  <>
                    <TableRow key={uuid()}>
                      <TableCell sx={{ fontSize: 14 }} align="center">
                        ¥{amount.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }} align="center">
                        {paymentsItem}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14 }} align="center">
                        {format(date.toDate(), "M/d")}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ fontSize: 12 }}>
                    データがありません
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
