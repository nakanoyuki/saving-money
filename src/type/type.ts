export type List = {
  postList: FormType[];
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export type FormType = {
  uid: string;
  date: any;
  amount: number;
  taxamount: number;
  paymentsItem: string;
  category: string;
  method: string;
  memo?: string;
  author: {
    username?: string | undefined;
    id: string;
  };
};
