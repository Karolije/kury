import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../../features/transactions/TransactionsSlice';

const EggForm = () => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    quantity: '',
    date: today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.quantity || !formData.date) {
      alert('Uzupełnij wszystkie wymagane pola');
      return;
    }

    const entry = {
      id: uuidv4(),
      type: 'collected',
      amount: parseInt(formData.quantity),
      date: formData.date,
    };

    try {
      await fetch('https://chicken-api-yqol.onrender.com/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      dispatch(fetchTransactions()); // Odśwież dane w Reduxie

      setFormData({
        quantity: '',
        date: today,
      });
    } catch (err) {
      console.error('Błąd przy zapisie', err);
      alert('Nie udało się zapisać danych');
    }
  };

  return (
    <form className="transaction-form glass-box" onSubmit={handleSubmit}>
      <h2>Zebrane jajka</h2>

      <div className="form-group">
        <label htmlFor="quantity">Ilość *</label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Data *</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">Zapisz</button>
      </div>
    </form>
  );
};

export default EggForm;
