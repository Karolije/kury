export interface Transaction {
  id: string; 
  type: "income" | "expense" | "collected" | "sold";
  amount: number;
  category?: string;
  note?: string;
  date: string;
  quantity?: number | null;
  price?: number | null;
}

export interface TransactionsState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export type TransactionInput = Omit<Transaction, "id">;
