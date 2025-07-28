import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { fetchTransactions } from '../../features/transactions/TransactionsSlice';

const EggChart = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    const grouped = {};

    transactions.forEach((item) => {
      if (item.type === 'collected') {
        if (!grouped[item.date]) {
          grouped[item.date] = { date: item.date, collected: 0 };
        }
        grouped[item.date].collected += Number(item.amount);
      }
    });

    const result = Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
    setData(result);
  }, [transactions]);

  return (
    <div className="glass-box" style={{ height: 300 }}>
      <h2>Zebrane jajka</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="collected" fill="#82ca9d" name="Zebrane" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EggChart;
