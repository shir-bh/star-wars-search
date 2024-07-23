export interface StarWarsContextType {
  loadingAll: boolean;
  loadingByCategory: boolean;
  search: string;
  setResultsByCategory: (data: ResultByCategoryType) => void;
  setSearch: (data: string) => void;
  getSearchResults: (data: string) => void;
  getSearchResultsByCategory: (data: string) => void;
  results: { [x: string]: PartialResultItem[] };
  resultsByCategory: ResultByCategoryType;
}

export interface PartialResultItem {
  url: string;
  name?: string;
  title?: string;
}

export interface ResultByCategoryType {
  count: number;
  next: string;
  previous: string;
  results: PartialResultItem[] | [];
}

export const resultByCategoryEmptyState = {
  count: 0,
  next: "",
  previous: "",
  results: [],
};
