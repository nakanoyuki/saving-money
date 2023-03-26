export type Props = {
  // eslint-disable-next-line
  date: any;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  Today: Date;
};

export type List = {
  postList: FormType[];
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export type FormType = {
  date: any;
  amount: number;
  paymentsItem: string;
  category: string;
  method: string;
  memo?: string;
};