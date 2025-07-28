import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../features/transactions/TransactionsSlice';
import { v4 as uuidv4 } from 'uuid';
import './style.css';

const TransactionForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    amount: '',
    type: 'income',
    category: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = ['Pasza', 'Karol', "Siudki"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category) {
      alert('Uzupełnij wymagane pola');
      return;
    }

    const transaction = {
      id: uuidv4(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    dispatch(addTransaction(transaction));

    setFormData({
      amount: '',
      type: 'income',
      category: '',
      note: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form className="transaction-form glass-box" onSubmit={handleSubmit}>
    <h2>Dodaj transakcję</h2>
  
    <div className="form-group">
      <label htmlFor="amount">Kwota *</label>
      <input
        id="amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-group">
      <label htmlFor="type">Typ</label>
      <select
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">Przychód</option>
        <option value="expense">Wydatek</option>
      </select>
    </div>
  
    <div className="form-group">
      <label htmlFor="category">Kategoria *</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">-- wybierz --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  
    <div className="form-group">
      <label htmlFor="note">Notatka</label>
      <input
        id="note"
        type="text"
        name="note"
        value={formData.note}
        onChange={handleChange}
      />
    </div>
  
    <div className="form-group">
      <label htmlFor="date">Data</label>
      <input
        id="date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
    </div>
  
    <div className="form-actions">
      <button type="submit">Dodaj</button>
    </div>
  </form>
  
  );
};

export default TransactionForm;
