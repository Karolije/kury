import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

const SummaryCards = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="summary-cards">
      <div className="card income">
        <h3>Przychody</h3>
        <p>{income.toFixed(2)} zł</p>
      </div>
      <div className="card expense">
        <h3>Wydatki</h3>
        <p>{expenses.toFixed(2)} zł</p>
      </div>
      <div className="card balance">
        <h3>Saldo</h3>
        <p>{balance.toFixed(2)} zł</p>
      </div>
    </div>
  );
};

export default SummaryCards;
