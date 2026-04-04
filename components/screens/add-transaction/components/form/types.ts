export type AddTransactionFormValues = {
  amount: string;
  categoryId: string;
  type: 'income' | 'expense';
  date: Date;
  notes: string;
};
