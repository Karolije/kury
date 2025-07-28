import React, { useEffect, useState } from 'react';
import './style.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
    className="theme-toggle-btn"
    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  >
    Przełącz na tryb {theme === 'light' ? 'ciemny' : 'jasny'}
  </button>
  );
};

export default ThemeToggle;
