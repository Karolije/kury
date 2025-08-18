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
