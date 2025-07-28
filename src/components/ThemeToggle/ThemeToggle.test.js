import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ThemeToggle from "./index";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.body.className = "";
    localStorage.clear();
  });

  it("renders with initial theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    expect(document.body.classList.contains("dark-theme")).toBe(true);
  });

  it("toggles theme from light to dark and saves to localStorage", () => {
    const { getByText } = render(<ThemeToggle />);
    const button = getByText(/Przełącz na tryb ciemny/i);

    fireEvent.click(button);

    expect(document.body.classList.contains("dark-theme")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    expect(getByText(/Przełącz na tryb jasny/i)).toBeInTheDocument();
  });

  it("toggles theme from dark to light", () => {
    localStorage.setItem("theme", "dark");
    const { getByText } = render(<ThemeToggle />);
    const button = getByText(/Przełącz na tryb jasny/i);

    fireEvent.click(button);

    expect(document.body.classList.contains("light-theme")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(getByText(/Przełącz na tryb ciemny/i)).toBeInTheDocument();
  });
});
