import { supabase } from "../features/supabaseClient";

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


export const fetchTransactionsApi = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) throw error;
  return (data ?? []).map((t: any) => ({
    ...t,
    id: t.id || crypto.randomUUID(),
  }));
};

export const addTransactionApi = async (transaction: Transaction): Promise<Transaction> => {
  const { data, error } = await supabase.from("transactions").insert([transaction]).select().single();
  if (error) throw error;
  return { ...data, id: data.id ?? crypto.randomUUID() };
};

export const deleteTransactionApi = async (id: string): Promise<void> => {
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw error;
};
