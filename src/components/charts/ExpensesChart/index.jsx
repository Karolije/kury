import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD0', '#FF6666'];

const ExpensesChart = () => {
  const transactions = useSelector(state => state.transactions.transactions);

  const incomes = transactions.filter(t => t.type === 'income');
  const incomeData = incomes.reduce((acc, { category, amount }) => {
    const found = acc.find(item => item.name === category);
    if (found) {
      found.value += Number(amount);
    } else {
      acc.push({ name: category, value: Number(amount) });
    }
    return acc;
  }, []);

  const expenses = transactions.filter(t => t.type === 'expense');
  const expenseData = expenses.reduce((acc, { category, amount }) => {
    const found = acc.find(item => item.name === category);
    if (found) {
      found.value += Number(amount);
    } else {
      acc.push({ name: category, value: Number(amount) });
    }
    return acc;
  }, []);

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

export default ExpensesChart;
