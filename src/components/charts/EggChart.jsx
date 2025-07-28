import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { fetchTransactions } from '../../features/transactions/TransactionsSlice';

const EggChart = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.transactions); // poprawiona ścieżka
    const [data, setData] = useState([]);
  
    useEffect(() => {
      dispatch(fetchTransactions());
    }, [dispatch]);
  
    useEffect(() => {
      console.log('transactions:', transactions); // debug
  
      if (!transactions || transactions.length === 0) return;
  
      const grouped = {};
  
      transactions.forEach((item) => {
        if (item.type === 'collected' || item.type === 'sold') {
          if (!grouped[item.date]) {
            grouped[item.date] = { date: item.date, collected: 0, sold: 0 };
          }
          if (item.type === 'collected') {
            grouped[item.date].collected += Number(item.amount);
          } else if (item.type === 'sold') {
            grouped[item.date].sold += Number(item.amount);
          }
        }
      });
  
      const result = Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
      setData(result);
    }, [transactions]);
  
    // Możesz też dodać console.log(data), by zobaczyć, co ustawiasz w stanie data
  
    return (
      <div className="glass-box" style={{ height: 300 }}>
        <h2>Podsumowanie jajek</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="collected" fill="#82ca9d" name="Zebrane" />
            <Bar dataKey="sold" fill="#8884d8" name="Sprzedane" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  

export default EggChart;
