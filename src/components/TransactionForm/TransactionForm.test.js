import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionForm from "./index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({});

describe("TransactionForm - podstawowe testy", () => {
  it("renderuje formularz z polami i przyciskiem", () => {
    render(
      <Provider store={store}>
        <TransactionForm />
      </Provider>
    );

    expect(screen.getByLabelText(/Kwota \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Typ/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kategoria \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notatka/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Dodaj/i })).toBeInTheDocument();
  });
});
