import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../axiosConfig";
import {
  PartialResultItem,
  resultByCategoryEmptyState,
  ResultByCategoryType,
  StarWarsContextType,
} from "../Consts/consts";
import axios from "axios";

export const StartWarsContext = createContext<StarWarsContextType | null>(null);

export const StarWarsProvider = ({ children }: { children: ReactNode }) => {
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [results, setResults] = useState({});
  const [resultsByCategory, setResultsByCategory] =
    useState<ResultByCategoryType>(resultByCategoryEmptyState);
  const [search, setSearch] = useState("");
  const [loadingByCategory, setLoadingByCategory] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  const getCategories = () => {
    api.get("https://swapi.dev/api/").then((res) => {
      const { data } = res;
      const endpoints = Object.keys(data);
      setAllCategories(endpoints);
    });
  };

  const getSearchResults = (search: string) => {
    setLoadingAll(true);
    const promises = allCategories.map((category) =>
      axios.get(`https://swapi.dev/api/${category}?search=${search}`),
    );
    Promise.all(promises)
      .then((res) => {
        const allResults = res.reduce(
          (acc: { [x: string]: PartialResultItem }, cur, index) => {
            const category: string = allCategories[index];
            acc[category] = cur.data?.results;
            return acc;
          },
          {},
        );
        setLoadingAll(false);
        setResults(allResults);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const getSearchResultsByCategory = (url: string) => {
    setLoadingByCategory(true);
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        setResultsByCategory(data);
        setLoadingByCategory(false);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <StartWarsContext.Provider
      value={{
        getSearchResults,
        getSearchResultsByCategory,
        loadingAll,
        loadingByCategory,
        results,
        resultsByCategory,
        search,
        setResultsByCategory,
        setSearch,
      }}
    >
      {children}
    </StartWarsContext.Provider>
  );
};

export const useStarWars = (): StarWarsContextType => {
  const context = useContext(StartWarsContext);
  if (!context) {
    throw new Error("useStarWars must be used within a StartWarsProvider");
  }
  return context;
};
