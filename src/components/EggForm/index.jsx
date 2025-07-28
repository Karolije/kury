import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../../features/transactions/TransactionsSlice';

const EggForm = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('collected');
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    quantity: '',
    date: today,
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.quantity || !formData.date || (mode === 'sold' && !formData.price)) {
      alert('Uzupełnij wszystkie wymagane pola');
      return;
    }

    const entry = {
      id: uuidv4(),
      type: mode, // "collected" lub "sold"
      amount: parseInt(formData.quantity),
      date: formData.date,
      price: mode === 'sold' ? parseFloat(formData.price) : null,
    };

    try {
      await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      dispatch(fetchTransactions()); // <== odśwież dane w Reduxie

      setFormData({
        quantity: '',
        date: today,
        price: '',
      });
      setMode('collected');
    } catch (err) {
      console.error('Błąd przy zapisie', err);
      alert('Nie udało się zapisać danych');
    }
  };

  return (
    <form className="transaction-form glass-box" onSubmit={handleSubmit}>
      <h2>{mode === 'collected' ? 'Zebrane jajka' : 'Sprzedane jajka'}</h2>

      <div className="form-group">
        <label>Typ</label>
        <div>
          <label>
            <input
              type="radio"
              name="mode"
              value="collected"
              checked={mode === 'collected'}
              onChange={() => setMode('collected')}
            />
            Zebrane
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="mode"
              value="sold"
              checked={mode === 'sold'}
              onChange={() => setMode('sold')}
            />
            Sprzedane
          </label>
        </div>
      </div>

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

      {mode === 'sold' && (
        <div className="form-group">
          <label htmlFor="price">Kwota sprzedaży *</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      )}

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
