import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addTransaction, fetchTransactions } from "../../features/transactions/transactionsThunks";
import type { AppDispatch } from "../../redux/store";
import type { EggFormData } from "./eggFormSchema";
import  { eggFormSchema } from "./eggFormSchema";
import type { TransactionInput } from "../../features/transactions/types";
import "./style.css";

export const EggForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eggFormSchema),
    defaultValues: { quantity: 0, date: today },
  });
  

  const onSubmit = async (data: EggFormData) => {
    const entry: TransactionInput = {
      type: "collected",
      amount: data.quantity,
      date: data.date,
    };
  
    try {
      await dispatch(addTransaction(entry)).unwrap();
      await dispatch(fetchTransactions());
      reset({ quantity: 0, date: today });
    } catch (error) {
      console.error("Błąd przy zapisie do Supabase:", error);
      alert("Nie udało się zapisać danych do Supabase");
    }
  };
  

  return (
    <form className="transaction-form glass-box" onSubmit={handleSubmit(onSubmit)}>
      <h2>Zebrane jajka</h2>

      <div className="form-group">
        <label htmlFor="quantity">Ilość *</label>
        <input
          id="quantity"
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          min={1}
        />
        {errors.quantity && <p className="error">{errors.quantity.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Data *</label>
        <input
          id="date"
          type="date"
          {...register("date")}
          max={today}
        />
        {errors.date && <p className="error">{errors.date.message}</p>}
      </div>

      <div className="form-actions">
        <button type="submit">Zapisz</button>
      </div>
    </form>
  );
};
