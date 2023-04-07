import { format } from "date-fns";
import { ExpenseIncome, FormType } from "./type/type";
import { startOfMonth } from "date-fns";

export const today = new Date();
export const month = format(today, "yyyy年M月");

export const selectMonth = () => {
  const today = new Date();
  const lastMonth1 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth2 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth3 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth4 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth5 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth6 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth7 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth8 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth9 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth10 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  const lastMonth11 = format(today.setMonth(today.getMonth() - 1), "yyyy年M月");
  return {
    lastMonth1,
    lastMonth2,
    lastMonth3,
    lastMonth4,
    lastMonth5,
    lastMonth6,
    lastMonth7,
    lastMonth8,
    lastMonth9,
    lastMonth10,
    lastMonth11,
  };
};
const {
  lastMonth1,
  lastMonth2,
  lastMonth3,
  lastMonth4,
  lastMonth5,
  lastMonth6,
  lastMonth7,
  lastMonth8,
  lastMonth9,
  lastMonth10,
  lastMonth11,
} = selectMonth();
export const monthlists = [
  lastMonth1,
  lastMonth2,
  lastMonth3,
  lastMonth4,
  lastMonth5,
  lastMonth6,
  lastMonth7,
  lastMonth8,
  lastMonth9,
  lastMonth10,
  lastMonth11,
];


export const groupByMonth = (expensePostList: ExpenseIncome[],incomepostList: ExpenseIncome[]) => {
  const groups: { [key: string]: ExpenseIncome[] } = {};

  expensePostList.forEach((post) => {
    const month = format(post.date.toDate(), "yyyy年M月");
    if (groups[month]) {
      groups[month].push(post);
    } else {
      groups[month] = [post];
    }
  });

  return groups;
};