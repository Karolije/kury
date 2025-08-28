import { useLocalStorage } from 'react-use';

export const usePortfolioState = (initialState: unknown) => {
  const [state, setState] = useLocalStorage('portfolioState', initialState);

  const saveState = (newState: unknown) => {
    setState(newState);
  };

  return { state, saveState };
};