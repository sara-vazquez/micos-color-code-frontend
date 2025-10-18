import React, { createContext, useContext } from 'react';

const SearchContext = createContext(null);

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children, handleSearch }) => {
  return (
    <SearchContext.Provider value={{ handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};