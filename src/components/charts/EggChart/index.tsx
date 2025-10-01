import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { fetchTransactions } from '../../../features/transactions/transactionsThunks';
import type { RootState, AppDispatch } from '../../../redux/store';
import './style.css';

type Transaction = {
  id: string;
  type: 'income' | 'expense' | 'collected';
  date: string;
  amount?: number;
  quantity?: number;
};

type EggData = {
  date: string;
  collected: number;
};

export const EggChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transactions.transactions as Transaction[]);
  const [data, setData] = useState<EggData[]>([]);
  const [view, setView] = useState<'month' | 'year'>('month');
  const [currentDate, setCurrentDate] = useState(new Date()); // aktualny miesiąc/rok

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Generowanie wszystkich dni w miesiącu
  const getAllDaysInMonth = (dateRef: Date) => {
    const year = dateRef.getFullYear();
    const month = dateRef.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const allDays: EggData[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      allDays.push({ date: `${day}.${month + 1}`, collected: 0 });
    }
    return allDays;
  };

  // Grupowanie danych w zależności od widoku
  const groupData = (transactions: Transaction[], view: 'month' | 'year', dateRef: Date) => {
    if (view === 'month') {
      const allDays = getAllDaysInMonth(dateRef);
      transactions.forEach(item => {
        if (item.type !== 'collected') return;
        const d = new Date(item.date);
        if (d.getFullYear() !== dateRef.getFullYear() || d.getMonth() !== dateRef.getMonth()) return;
        const index = d.getDate() - 1;
        allDays[index].collected += Number(item.amount || 0);
      });
      return allDays;
    } else {
      const grouped: Record<string, EggData> = {};
      transactions.forEach(item => {
        if (item.type !== 'collected') return;
        const d = new Date(item.date);
        if (d.getFullYear() !== dateRef.getFullYear()) return;
        if (!grouped[item.date]) grouped[item.date] = { date: item.date, collected: 0 };
        grouped[item.date].collected += Number(item.amount || 0);
      });
      return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
    }
  };

  // Aktualizacja danych po zmianie widoku lub daty
  useEffect(() => {
    if (!transactions || transactions.length === 0) return;
    setData(groupData(transactions, view, currentDate));
  }, [transactions, view, currentDate]);

  const formatDate = (dateStr: string) => {
    if (view === 'month') return dateStr; // dzien.miesiąc
    return dateStr; // rok – pełna data
  };

  const tooltipFormatter = (value: number) => `${value} szt.`;

  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="egg-chart-container" style={{ height: 350 }}>
      <h2>Zebrane jajka</h2>

      <div className="view-toggle">
        <button onClick={() => setView('month')} disabled={view === 'month'}>
          Widok miesięczny
        </button>
        <button onClick={() => setView('year')} disabled={view === 'year'}>
          Widok roczny
        </button>
      </div>

      {view === 'month' && (
        <div className="month-navigation">
          <button onClick={prevMonth}>← Poprzedni miesiąc</button>
          <span>{currentDate.getMonth() + 1}.{currentDate.getFullYear()}</span>
          <button onClick={nextMonth}>Następny miesiąc →</button>
        </div>
      )}

      {view === 'year' && (
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          Rok: {currentDate.getFullYear()}
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip formatter={tooltipFormatter} />
          <Bar dataKey="collected" fill="#82ca9d" name="Zebrane" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
