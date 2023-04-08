import { usePostList } from "../hooks/usePostList";
import { format } from "date-fns";
import RegisterTable from "../components/RegisterTable";
import { useState } from "react";
import { month, monthlists } from "../../src/util";

const SpendingMoneyTable = () => {
  const { postList } = usePostList();



  return (
    <div className="pageArea">
      <RegisterTable postList={postList}  />
   
    </div>
  );
};

export default SpendingMoneyTable;
