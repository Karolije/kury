import React, {useMemo} from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import type { Transaction } from '../../api/supabaseApi';
import './style.css';

export const SummaryCards: React.FC = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions as Transaction[]
  );

 
  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);
  
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

