export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("portfolioState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Błąd podczas wczytywania stanu z localStorage", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("portfolioState", serializedState);
  } catch (err) {
    console.warn("Błąd podczas zapisywania stanu do localStorage", err);
  }
};
