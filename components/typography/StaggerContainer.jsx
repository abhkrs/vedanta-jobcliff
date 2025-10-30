'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const StaggerContext = createContext();

export const useStagger = () => {
  const context = useContext(StaggerContext);
  if (!context) return { delay: 0 };
  
  const { getNextDelay } = context;
  const [delay] = useState(() => getNextDelay());
  return { delay };
};

export const StaggerContainer = ({ children, baseDelay = 0, increment = 0.1 }) => {
  let currentDelay = baseDelay;
  
  const getNextDelay = () => {
    const delay = currentDelay;
    currentDelay += increment;
    return delay;
  };

  return (
    <StaggerContext.Provider value={{ getNextDelay }}>
      {children}
    </StaggerContext.Provider>
  );
};