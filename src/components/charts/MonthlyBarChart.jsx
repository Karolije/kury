import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// pomocnicza funkcja: zwraca np. "7-2025"
const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}-${date.getFullYear()}`;
};

// komponent podsumowania
const MonthlySummary = ({ data }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>📊 Podsumowanie miesięczne</h3>
      {data.map((item) => {
        const avg =
          item.daysWithEggs.size > 0
            ? (item.collectedEggs / item.daysWithEggs.size).toFixed(1)
            : '0';
        const balance = item.income - item.expense;
        return (
          <div key={item.month} style={{ marginBottom: '1rem' }}>
            <strong>{item.month}</strong>
            <br />
            🥚 Zebrane jajka: {item.collectedEggs}
            <br />
            💸 Sprzedane jajka: {item.soldEggs}
            <br />
            💰 Saldo: {balance.toFixed(2)} zł
            <br />
            📅 Średnia dzienna liczba jajek: {avg}
          </div>
        );
      })}
    </div>
  );
};

// główny komponent
const MonthlyBarChart = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const dataMap = {};

  transactions.forEach(({ date, amount, quantity, type }) => {
    if (!date) return;
    const monthYear = getMonthYear(date);

    if (!dataMap[monthYear]) {
      dataMap[monthYear] = {
        month: monthYear,
        income: 0,
        expense: 0,
        collectedEggs: 0,
        soldEggs: 0,
        daysWithEggs: new Set(),
      };
    }

    const monthData = dataMap[monthYear];

    if (type === 'income') {
      monthData.income += Number(amount || 0);
      monthData.soldEggs += Number(quantity || 0);
    } else if (type === 'expense') {
      monthData.expense += Number(amount || 0);
    } else if (type === 'collected') {
      monthData.collectedEggs += Number(amount || 0);
      monthData.daysWithEggs.add(date);
    }
  });

  const data = Object.values(dataMap)
    .sort((a, b) => {
      const [mA, yA] = a.month.split('-').map(Number);
      const [mB, yB] = b.month.split('-').map(Number);
      return yA !== yB ? yA - yB : mA - mB;
    })
    .map((item) => ({
      ...item,
      daysWithEggs: item.daysWithEggs || new Set(),
    }));

  if (data.length === 0) {
    return <p>Brak danych do wykresu miesięcznego.</p>;
  }

  return (
    <div style={{ width: '100%', marginBottom: '50px' }}>
      <h2>📈 Przychody i wydatki miesięczne</h2>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => value.toFixed(2)} />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" name="Przychody" />
            <Bar dataKey="expense" fill="#ff4d4f" name="Wydatki" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Podsumowanie z saldem */}
      <MonthlySummary data={data} />
    </div>
  );
};

export default MonthlyBarChart;
