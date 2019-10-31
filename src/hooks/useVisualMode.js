import React, { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  return { 
    mode, 
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
        console.log("variableee:", variable)
        setMode(variable);
        setHistory(copyHistory);
      }
    }
  };
}