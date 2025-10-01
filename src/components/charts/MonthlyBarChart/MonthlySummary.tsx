import React from 'react';
import './style.css';

type MonthlyData = {
  month: string;
  income: number;
  expense: number;
  collectedEggs: number;
  soldEggs: number;
  daysWithEggs: Set<string>;
};

type MonthlySummaryProps = {
  data: MonthlyData[];
};

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ data }) => {
  return (
    <div className="monthly-summary">
      <h3>📊 Podsumowanie miesięczne</h3>
      {data.map((item) => {
        const avg =
          item.daysWithEggs.size > 0
            ? (item.collectedEggs / item.daysWithEggs.size).toFixed(1)
            : '0';
        const balance = item.income - item.expense;

        return (
          <div key={item.month} className="monthly-card">
            <h4>{item.month}</h4>
            <p>🥚 Zebrane jajka: <strong>{item.collectedEggs}</strong></p>
            <p>💸 Sprzedane jajka: <strong>{item.soldEggs}</strong></p>
            <p>💰 Saldo: <strong>{balance.toFixed(2)} zł</strong></p>
            <p>📅 Średnia dzienna liczba jajek: <strong>{avg}</strong></p>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlySummary;
export type { MonthlyData };
