import { css } from "@emotion/react";
import {
  collection,
  getDocs,
  CollectionReference,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

import RegisterTable from "../components/RegisterTable";
import { Props } from "../type/type";

const pageArea = css`
  padding: 50px 1% 100px 200px;
  h2 {
    font-weight: 700;
  }
`;

const SpendingMoneyTable = () => {
  const [postList, setPostList] = useState<Props[]>([]);

  useEffect(() => {
    const getLists = async () => {
      const usersRef = collection(db, "lists") as CollectionReference<Props>;
      const data = await getDocs(query(usersRef, orderBy("date", "desc")));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLists();
  }, []);

  return (
    <div className="pageArea" css={pageArea}>
      <ul>
        <RegisterTable postList={postList} />
      </ul>
    </div>
  );
};

export default SpendingMoneyTable;
