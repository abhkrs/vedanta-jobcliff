'use client';
import { createContext, useContext, useState } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    return { isPageTransitionComplete: true };
  }
  return context;
};

export function AnimationProvider({ children }) {
  const [isPageTransitionComplete, setIsPageTransitionComplete] = useState(true);

  return (
    <AnimationContext.Provider value={{ 
      isPageTransitionComplete, 
      setIsPageTransitionComplete 
    }}>
      {children}
    </AnimationContext.Provider>
  );
}
