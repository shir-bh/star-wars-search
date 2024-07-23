import React, { useState } from "react";
import { useStarWars } from "../Context/StarWaresContext";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../Utilities/utilities";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Search = () => {
  const { results, loadingAll, getSearchResults, search, setSearch } =
    useStarWars();
  const navigate = useNavigate();

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search Star Wars"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => getSearchResults(search)}>Search</Button>
      </SearchContainer>
      {loadingAll ? (
        <Loader />
      ) : (
        <ResultsContainer>
          {Object.keys(results).map((category) =>
            results[category]?.length > 0 ? (
              <div key={category}>
                <CategoryHeader>
                  {capitalizeFirstLetter(category)}
                </CategoryHeader>
                <Results>
                  {results[category]
                    ?.slice(0, 3)
                    .map((result: any) => (
                      <ResultItem key={result.name || result.title}>
                        {result.name || result.title}
                      </ResultItem>
                    ))}
                </Results>
                <ShowAllButton
                  onClick={() => {
                    navigate(`/category/${category}/${search}`);
                  }}
                >
                  Show All
                </ShowAllButton>
                <Separator />
              </div>
            ) : null,
          )}
        </ResultsContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Inter", sans-serif;
  color: #333;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f5f5f5;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 12px 20px;
  border: none;
  background-color: #007bff; /* Strong blue color */
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CategoryHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #555;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const ResultItem = styled.div`
  padding: 10px 0;
  font-size: 16px;
  color: #333;
`;

const ShowAllButton = styled.button`
  padding: 10px;
  border: none;
  background-color: transparent;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
  margin-top: 10px;

  &:hover {
    color: #074481;
  }
`;

const Separator = styled.hr`
  margin-top: 20px;
  border: none;
  border-top: 1px solid #ddd;
`;

export default Search;
