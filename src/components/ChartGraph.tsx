import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ExpenseIncome } from "../type/type";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartGraph = ({ expensepostList, incomepostList }: ExpenseIncome) => {
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

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "収支グラフ",
      },
    },
  };

  const labels = [
    "1月",
    "2月",
    // "3月",
    // "4月",
    // "5月",
    // "6月",
    // "7月",
    // "8月",
    // "9月",
    // "10月",
    // "11月",
    // "12月",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "収支グラフ",
        data: [spendingTotal(),spendingTotal()],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default ChartGraph;
