import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, fetchTransactions } from "../../features/transactions/TransactionsSlice";
import "./style.css";

const EggForm = () => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    quantity: "",
    date: today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.quantity || !formData.date) {
      alert("Uzupełnij wszystkie wymagane pola");
      return;
    }

    const entry = {
      type: "collected",
      amount: parseInt(formData.quantity, 10),
      date: formData.date,
      price: null,
    };

    try {
      await dispatch(addTransaction(entry)).unwrap();
      await dispatch(fetchTransactions());
      setFormData({
        quantity: "",
        date: today,
      });
    } catch (error) {
      console.error("Błąd przy zapisie do Supabase:", error);
      alert("Nie udało się zapisać danych do Supabase");
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
          min={1}
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
          max={today}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Zapisz</button>
      </div>
    </form>
  );
};

export default EggForm;
