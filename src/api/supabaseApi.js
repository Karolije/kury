import axios from "axios";

const SUPABASE_BASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_BASE_URL || !SUPABASE_API_KEY) {
  throw new Error("Brakuje zmiennych środowiskowych Supabase!");
}

const defaultHeaders = {
  apikey: SUPABASE_API_KEY,
  Authorization: `Bearer ${SUPABASE_API_KEY}`,
  "Content-Type": "application/json",
};

const supabaseApi = axios.create({
  baseURL: SUPABASE_BASE_URL + "/rest/v1",
  headers: defaultHeaders,
});

export const fetchTransactionsApi = async () => {
  const { data } = await supabaseApi.get("/transactions");
  return data;
};

export const addTransactionApi = async (transaction) => {
  const { data } = await supabaseApi.post("/transactions", transaction, {
    headers: { Prefer: "return=representation" },
  });
  return data;
};

export const deleteTransactionApi = async (id) => {
  await supabaseApi.delete("/transactions", {
    headers: { Prefer: "return=minimal" },
    params: { id: `eq.${id}` },
  });
  return id;
};
