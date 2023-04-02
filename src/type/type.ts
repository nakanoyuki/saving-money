export type List = {
  postList: FormType[];
};
export type ExpenseIncome = {
  expensepostList: FormType[];
  incomepostList: FormType[];
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export type FormType = {
  date: any;
  amount: number;
  taxamount: number;
  paymentsItem: string;
  category: string;
  method: string;
  memo?: string;
  uid: string | null | undefined;
};