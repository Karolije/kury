import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { RootState } from '../../../redux/store';
import type { Transaction } from '../../../features/transactions/types';
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD0', '#FF6666'];

type ChartData = {
  name: string;
  value: number;
};

export const ExpensesChart: React.FC = () => {
  const transactions = useSelector<RootState, Transaction[]>(
    (state) => state.transactions.transactions
  );

  const prepareChartData = (type: 'income' | 'expense'): ChartData[] => {
    return transactions
      .filter(t => t.type === type && t.category)
      .reduce<ChartData[]>((acc, t) => {
        const found = acc.find(item => item.name === t.category);
        if (found) {
          found.value += t.amount;
        } else {
          acc.push({ name: t.category!, value: t.amount });
        }
        return acc;
      }, []);
  };

  const incomeData = prepareChartData('income');
  const expenseData = prepareChartData('expense');

  return (
    <div className="charts-wrapper">
      <h2>Przychody wg kategorii (zł.)</h2>
      {incomeData.length === 0 ? (
        <p>Brak przychodów do wyświetlenia.</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={incomeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#82ca9d"
            label
          >
            {incomeData.map((entry, index) => (
              <Cell key={`income-cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}

      <h2>Wydatki wg kategorii (zł.)</h2>
      {expenseData.length === 0 ? (
        <p>Brak wydatków do wyświetlenia.</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {expenseData.map((entry, index) => (
              <Cell key={`expense-cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};
