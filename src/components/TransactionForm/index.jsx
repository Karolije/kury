import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../../features/transactions/TransactionsSlice';
import { v4 as uuidv4 } from 'uuid';
import './style.css';

const supabaseUrl = 'https://swvtsttgmzpoyogwnzqg.supabase.co/rest/v1/transactions';
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dnRzdHRnbXpwb3lvZ3duenFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzExNjcsImV4cCI6MjA2OTM0NzE2N30.VF13EPbvzZsKA0wstWuo9EkjHDSM8_Mw7IAK-FGRCeE";

const TransactionForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    amount: '',
    type: 'income',
    category: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
    quantity: '',
    price: '',
  });

  const categories = ['Pasza', 'Karol', 'Siudki', ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (updated.type === 'income' && updated.quantity && updated.price) {
        updated.amount = (parseFloat(updated.quantity) * parseFloat(updated.price)).toFixed(2);
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { type, amount, category, quantity, price } = formData;

    if (!amount || !category || (type === 'income' && (!quantity || !price))) {
      alert('Uzupełnij wszystkie wymagane pola');
      return;
    }

    const transaction = {
      id: uuidv4(),
      ...formData,
      amount: parseFloat(amount),
      quantity: quantity ? parseInt(quantity) : null,
      price: price ? parseFloat(price) : null,
    };

    try {
      const response = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Błąd dodawania do Supabase: ${errorText}`);
      }

      dispatch(fetchTransactions());

      setFormData({
        amount: '',
        type: 'income',
        category: '',
        note: '',
        date: new Date().toISOString().split('T')[0],
        quantity: '',
        price: '',
      });
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd podczas zapisywania transakcji.');
    }
  };

  return (

    <form className="glass-box egg-form" onSubmit={handleSubmit}>
      <h2>Dodaj transakcję</h2>

      <div className="form-group">
        <label htmlFor="type">Typ</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value="income">Przychód</option>
          <option value="expense">Wydatek</option>
        </select>
      </div>

      {formData.type === 'income' && (
        <>
          <div className="form-group">
            <label htmlFor="quantity">Liczba jajek *</label>
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
            <label htmlFor="price">Cena za 1 szt. (zł) *</label>
            <input
              id="price"
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="amount">Kwota *</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          readOnly={formData.type === 'income'}
        />
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
