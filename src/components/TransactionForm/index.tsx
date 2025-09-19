"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { addTransaction, fetchTransactions } from "../../features/transactions/transactionsThunks";
import type { AppDispatch } from "../../redux/store";
import type { TransactionInput } from "../../features/transactions/types";
import "./style.css";

const transactionSchema = z
  .object({
    type: z.string(),
    quantity: z.preprocess(
      (val) => (val === "" ? 0 : Number(val)),
      z.number().min(0, { message: "Wartość musi być nieujemna" })
    ),
    price: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number().min(0, { message: "Kwota musi być nieujemna" }).optional()
    ),
    amount: z.preprocess(
      (val) => (val === "" ? 0 : Number(val)),
      z.number().min(0, { message: "Kwota musi być nieujemna" })
    ),
    category: z.string().min(1, { message: "Kategoria jest wymagana" }),
    note: z.string().optional(),
    date: z.string().min(1, { message: "Data jest wymagana" }),
  })
  .superRefine((val, ctx) => {
    if (val.type !== "income" && val.type !== "expense") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["type"],
        message: "Typ musi być 'income' lub 'expense'",
      });
    }
    if (val.type === "income") {
      if (val.quantity === undefined || val.quantity < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["quantity"],
          message: "Liczba jajek jest wymagana i musi być >= 1",
        });
      }
      if (val.price === undefined || val.price < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["price"],
          message: "Cena za sztukę jest wymagana i musi być > 0",
        });
      }
    }
  });

type TransactionFormData = z.infer<typeof transactionSchema>;

export const TransactionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      quantity: 0,
      price: 0,
      amount: 0,
      category: "",
      note: "",
      date: today,
    },
  });

  const type = watch("type");
  const quantity = watch("quantity");
  const price = watch("price");

  useEffect(() => {
    if (type === "income") {
      const qty = Number(quantity || 0);
      const pr = Number(price || 0);
      const calculated = +(qty * pr).toFixed(2);
      setValue("amount", isNaN(calculated) ? 0 : calculated, { shouldValidate: true });
    }
  }, [type, quantity, price, setValue]);

  const onSubmit = async (data: TransactionFormData) => {
    const entry: TransactionInput = {
      type: data.type as "income" | "expense",
      amount: Number(data.amount),
      category: data.category,
      note: data.note ?? "",
      date: data.date,
      quantity: data.quantity ?? null,
      price: data.price ?? null,
    };

    try {
      await dispatch(addTransaction(entry)).unwrap();
      await dispatch(fetchTransactions());
      reset({
        type: "expense",
        quantity: 0,
        price: 0,
        amount: 0,
        category: "",
        note: "",
        date: today,
      });
    } catch (err) {
      console.error("Błąd podczas zapisu:", err);
      alert("Wystąpił błąd podczas zapisywania transakcji.");
    }
  };

  return (
    <form className="glass-box egg-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Dodaj transakcję</h2>

      <div className="form-group">
        <label htmlFor="type">Typ</label>
        <select id="type" {...register("type")}>
          <option value="income">Przychód</option>
          <option value="expense">Wydatek</option>
        </select>
        {errors.type && <p className="error">{errors.type.message}</p>}
      </div>

      {type === "income" && (
        <>
          <div className="form-group">
            <label htmlFor="quantity">Liczba jajek *</label>
            <input id="quantity" type="number" {...register("quantity")} min={0} step={1} />
            {errors.quantity && <p className="error">{errors.quantity.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Cena za 1 szt. (zł) *</label>
            <input id="price" type="number" step="0.01" {...register("price")} min={0} />
            {errors.price && <p className="error">{errors.price.message}</p>}
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="amount">Kwota *</label>
        <input id="amount" type="number" step="0.01" {...register("amount")} min={0} readOnly={type === "income"} />
        {errors.amount && <p className="error">{errors.amount.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategoria *</label>
        <select id="category" {...register("category")}>
          <option value="">-- wybierz --</option>
          <option value="Pasza">Pasza</option>
          <option value="Kupno kur">Kupno kur</option>
          <option value="Karol">Karol</option>
          <option value="Siudki">Siudki</option>
          <option value="Mama">Mama</option>
          <option value="Aga">Aga</option>
          <option value="Kornik">Kornik</option>

        </select>
        {errors.category && <p className="error">{errors.category.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="note">Notatka</label>
        <input id="note" type="text" {...register("note")} />
      </div>

      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" {...register("date")} max={today} />
        {errors.date && <p className="error">{errors.date.message}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Dodawanie..." : "Dodaj"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
