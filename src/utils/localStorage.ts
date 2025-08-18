export const saveState = (state: unknown) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("portfolioState", serializedState);
  } catch (e) {
    console.error("Błąd zapisu stanu do localStorage", e);
  }
};
