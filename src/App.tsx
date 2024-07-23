import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./Components/Search";
import { StarWarsProvider } from "./Context/StarWaresContext";
import styled from "styled-components";
import Category from "./Components/Category";

const App = () => {
  return (
    <StarWarsProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/category/:category/:search" element={<Category />} />
          </Routes>
        </Container>
      </Router>
    </StarWarsProvider>
  );
};

const Container = styled.div`
  height: 100%;
`;

export default App;
