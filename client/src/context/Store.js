import { createContext, useContext, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const Store = createContext();

export const useMyContext = () => useContext(Store);

export const ContextProvider = ({ children }) => {
  const location = useLocation();
  console.log("Location: ", location);
  const { search } = useLocation();
  console.log("Search Location: ", search);

  const cache = useRef({});

  const [refetching, setRefetching] = useState(false);

  const { page, sortPage, searchPage } = useMemo(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    const sortPage = new URLSearchParams(search).get("sort") || "createdAt";
    const searchPage = new URLSearchParams(search).get("search") || "";

    return { page: Number(page), sortPage: sortPage, searchPage: searchPage };
  }, [search]);

  const value = {
    page,
    sortPage,
    searchPage,
    cache,
    refetching,
    setRefetching,
  };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
