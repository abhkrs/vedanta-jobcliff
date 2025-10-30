'use client';
import { createContext, useContext, useState } from 'react';

const PreloaderContext = createContext();

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <PreloaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </PreloaderContext.Provider>
  );
}
