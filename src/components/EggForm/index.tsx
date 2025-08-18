import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, fetchTransactions } from "../../features/transactions/TransactionsSlice";
import type { AppDispatch } from "../../redux/store";
import type { Transaction } from "../../features/transactions/types";
import "./style.css";

export const EggForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<{ quantity: string; date: string }>({
    quantity: "",
    date: today,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.quantity || !formData.date) {
      alert("Uzupełnij wszystkie wymagane pola");
      return;
    }

    const entry: Omit<Transaction, "id"> = { 
      type: "collected",
      amount: parseInt(formData.quantity, 10),
      date: formData.date,
    };

    try {
      await dispatch(addTransaction(entry as Transaction)).unwrap();
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

