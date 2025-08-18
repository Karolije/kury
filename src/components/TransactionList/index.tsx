import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions, deleteTransaction } from "../../features/transactions/TransactionsSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Transaction } from "../../features/transactions/types";
import "./style.css";

const TransactionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [visibleCount, setVisibleCount] = useState(5);

  const transactions = useSelector((state: RootState) => state.transactions.transactions ?? []);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteTransaction(id)).unwrap();
    dispatch(fetchTransactions());
  };

  if (transactions.length === 0) return <p>Brak transakcji</p>;

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const visible = sorted.slice(0, visibleCount);

  return (
    <div className="transaction-scroll-wrapper">
      <h2>Lista transakcji</h2>
      <ul className="transaction-scroll">
        {visible.map(({ id, amount, type, category, note, date }) => {
          const isIncome = ["income", "collected", "sold"].includes(type);

          return (
            <li key={id} className={isIncome ? "income" : "expense"}>
              <div className="transaction-content">
                <strong>{category}</strong> — {amount?.toFixed(2)} {["collected", "sold"].includes(type) ? "szt." : "zł."} <br />
                <small>{date}</small>
                {note && <em>Notatka: {note}</em>}
              </div>
              <button onClick={() => handleDelete(id)}>Usuń</button>
            </li>
          );
        })}
      </ul>

      {visibleCount < sorted.length && (
        <button className="show-more-btn" onClick={() => setVisibleCount(visibleCount + 5)}>
          Pokaż więcej
        </button>
      )}
    </div>
  );
};

export default TransactionList;
