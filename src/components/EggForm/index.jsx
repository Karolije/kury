import React, { useState } from 'react';
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.quantity || !formData.date) {
      alert('Uzupełnij wszystkie wymagane pola');
      return;
    }

    const entry = {
      type: 'collected',
      amount: parseInt(formData.quantity),
      date: formData.date,
      price: null,
    };

    console.log('Wysyłam do Supabase:', entry);

    try {
      const supabaseUrl = 'https://swvtsttgmzpoyogwnzqg.supabase.co/rest/v1/transactions';
      const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dnRzdHRnbXpwb3lvZ3duenFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzExNjcsImV4cCI6MjA2OTM0NzE2N30.VF13EPbvzZsKA0wstWuo9EkjHDSM8_Mw7IAK-FGRCeE';

      const response = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(entry),
      });

      console.log('Status odpowiedzi:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Błąd serwera:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Odpowiedź z Supabase:', data);

      dispatch(fetchTransactions());

      setFormData({
        quantity: '',
        date: today,
      });
    } catch (err) {
      console.error('Błąd przy zapisie do Supabase:', err);
      alert('Nie udało się zapisać danych do Supabase');
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
