import React, { useEffect, useState } from 'react';
import './style.css';

const supabaseUrl = 'https://swvtsttgmzpoyogwnzqg.supabase.co/rest/v1/transactions';
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dnRzdHRnbXpwb3lvZ3duenFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzExNjcsImV4cCI6MjA2OTM0NzE2N30.VF13EPbvzZsKA0wstWuo9EkjHDSM8_Mw7IAK-FGRCeE";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${supabaseUrl}?select=*`, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await res.json();
  
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Błąd pobierania transakcji:', error);
      setTransactions([]);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${supabaseUrl}?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          Prefer: 'return=minimal',
        },
      });

      if (res.ok) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      } else {
        console.error('Błąd usuwania transakcji');
      }
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (transactions.length === 0) {
    return <p>Brak transakcji</p>;
  }

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const visible = sorted.slice(0, visibleCount);

  return (
    <div className="transaction-scroll-wrapper">
      <h2>Lista transakcji</h2>
      <ul className="transaction-scroll">
        {visible.map(({ id, amount, type, category, note, date }) => (
          <li key={id} className={(type === 'income' || type === 'collected' || type === 'sold') ? 'income' : 'expense'}>
            <div className="transaction-content">
              <strong>{category}</strong> — {amount?.toFixed(2)} {(type === 'collected' || type === 'sold') ? 'szt.' : 'zł.'} <br />
              <small>{date}</small>
              {note && <em>Notatka: {note}</em>}
            </div>
            <button onClick={() => handleDelete(id)}>Usuń</button>
          </li>
        ))}
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
