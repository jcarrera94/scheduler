import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const [error, setError] = useState('');

  return { 
    mode, 
    error,
    clearError: () => {
      setError('');
    },
    logError: (msg) => {
      setError(msg);
    },
    transition: (newMode, replace = false) => {
      setMode(newMode); 
      if (replace) {
        let copyHistory = [...history];
        copyHistory.splice(-1, 1, newMode);
        setHistory(copyHistory);
      } else {
        setHistory([...history, newMode]);
      }
    },
    back: () => {
      if (history.length > 1) {
        let copyHistory = [...history]
        copyHistory.pop();
        let variable = copyHistory.slice(-1)[0];
        setMode(variable);
        setHistory(copyHistory);
      }
    }
  };
}