import React from "react";
import { render } from "@testing-library/react";
import SummaryCards from "./index";
import { Provider } from "react-redux";
import { createStore } from "redux";

const renderWithRedux = (initialState) => {
  const reducer = (state = initialState) => state;
  const store = createStore(reducer);
  return render(
    <Provider store={store}>
      <SummaryCards />
    </Provider>
  );
};

describe("SummaryCards", () => {
  it("renders correct income, expenses and balance", () => {
    const initialState = {
      transactions: {
        transactions: [
          { id: 1, type: "income", amount: 1000 },
          { id: 2, type: "expense", amount: 400 },
          { id: 3, type: "income", amount: 200 },
          { id: 4, type: "expense", amount: 150 },
        ],
      },
    };

    const { getByText } = renderWithRedux(initialState);

    expect(getByText("Przychody")).toBeInTheDocument();
    expect(getByText("1200.00 zł")).toBeInTheDocument();

    expect(getByText("Wydatki")).toBeInTheDocument();
    expect(getByText("550.00 zł")).toBeInTheDocument();

    expect(getByText("Saldo")).toBeInTheDocument();
    expect(getByText("650.00 zł")).toBeInTheDocument();
  });

  it("renders zero income, expense and balance when no transactions", () => {
    const initialState = {
      transactions: {
        transactions: [],
      },
    };

    const { getByText } = renderWithRedux(initialState);

    expect(getByText("Przychody").nextSibling.textContent).toBe("0.00 zł");
    expect(getByText("Wydatki").nextSibling.textContent).toBe("0.00 zł");
    expect(getByText("Saldo").nextSibling.textContent).toBe("0.00 zł");
  });
});
