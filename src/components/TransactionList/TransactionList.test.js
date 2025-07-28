import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList from "./index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { deleteTransaction } from "../../features/transactions/TransactionsSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../features/transactions/TransactionsSlice", () => ({
  deleteTransaction: jest.fn(),
}));

const mockStore = configureStore([]);

describe("TransactionList - podstawowe testy", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    require("react-redux").useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("pokazuje 'Brak transakcji' gdy lista jest pusta", () => {
    require("react-redux").useSelector.mockReturnValue([]);

    render(<TransactionList />);

    expect(screen.getByText(/Brak transakcji/i)).toBeInTheDocument();
  });

  it("wyświetla listę transakcji", () => {
    const dummyTransactions = [
      {
        id: "1",
        amount: 100,
        type: "income",
        category: "Pensja",
        note: "",
        date: "2023-07-10",
      },
      {
        id: "2",
        amount: 50,
        type: "expense",
        category: "Jedzenie",
        note: "Obiad",
        date: "2023-07-09",
      },
    ];

    require("react-redux").useSelector.mockReturnValue(dummyTransactions);

    render(<TransactionList />);

    expect(screen.getByText(/Lista transakcji/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText(/Pensja/i)).toBeInTheDocument();
    expect(screen.getByText(/Jedzenie/i)).toBeInTheDocument();
  });

  it("kliknięcie 'Usuń' wywołuje dispatch z deleteTransaction", () => {
    const dummyTransactions = [
      {
        id: "1",
        amount: 100,
        type: "income",
        category: "Pensja",
        note: "",
        date: "2023-07-10",
      },
    ];

    require("react-redux").useSelector.mockReturnValue(dummyTransactions);

    render(<TransactionList />);

    fireEvent.click(screen.getByText(/Usuń/i));

    expect(deleteTransaction).toHaveBeenCalledWith("1");
    expect(dispatchMock).toHaveBeenCalled();
  });
});
