import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}-${date.getFullYear()}`;
};

const MonthlyBarChart = () => {
  const transactions = useSelector(state => state.transactions.transactions);

  const dataMap = {};

  transactions.forEach(({ date, amount, type }) => {
    if (!date) return;
    const monthYear = getMonthYear(date);

    if (!dataMap[monthYear]) {
      dataMap[monthYear] = { month: monthYear, income: 0, expense: 0 };
    }

    if (type === 'income') {
      dataMap[monthYear].income += Number(amount);
    } else if (type === 'expense') {
      dataMap[monthYear].expense += Number(amount);
    }
  });

  const data = Object.values(dataMap).sort((a, b) => {
    const [mA, yA] = a.month.split('-').map(Number);
    const [mB, yB] = b.month.split('-').map(Number);
    return yA !== yB ? yA - yB : mA - mB;
  });

  if (data.length === 0) {
    return <p>Brak danych do wykresu miesięcznego.</p>;
  }

  return (
    <div style={{ width: '100%', height: 300, marginBottom:"50px" }}>
      <h2>Przychody i wydatki miesięczne</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" name="Przychody" />
          <Bar dataKey="expense" fill="#ff4d4f" name="Wydatki" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
