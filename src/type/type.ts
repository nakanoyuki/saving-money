export type Props = {
  // eslint-disable-next-line
  date: any;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  Today: Date;
  amount: string | undefined;
  setAmount: React.Dispatch<React.SetStateAction<string | undefined>>;
  paymentsItem: string;
  setPaymentsItem: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  memo: string | undefined;
  setMemo: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export type List = {
  postList: Props[];
};
