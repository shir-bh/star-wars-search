import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useStarWars } from "../Context/StarWaresContext";
import {
  PartialResultItem,
  resultByCategoryEmptyState,
  ResultByCategoryType,
} from "../Consts/consts";
import styled from "styled-components";
import { Button } from "./Search";
import { capitalizeFirstLetter } from "../Utilities/utilities";
import Loader from "./Loader";

const CategoryPage = () => {
  const {
    getSearchResultsByCategory,
    resultsByCategory,
    loadingByCategory,
    setResultsByCategory,
  } = useStarWars();
  const { count, next, previous, results }: ResultByCategoryType =
    resultsByCategory;
  const { category, search } = useParams<{
    category: string;
    search: string;
  }>();
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<PartialResultItem[]>(results || []);
  const [editMode, setEditMode] = useState(-1);

  const handleDelete = (url: string) => {
    setItems(items.filter((item) => item.url !== url));
  };

  useEffect(() => {
    setItems(results);
  }, [results, resultsByCategory]);

  useEffect(() => {
    getSearchResultsByCategory(
      `https://swapi.dev/api/${category}?search=${search}`,
    );
    return () => setResultsByCategory(resultByCategoryEmptyState);
  }, []);

  const handleEdit = (index: number) => {
    const newEditMode = index === editMode ? -1 : index;
    setEditMode(newEditMode);
  };

  const handleCreate = () => {
    const newItem = {
      url: "",
      name: `New ${capitalizeFirstLetter(category || "")}`,
    };
    setItems([...items, newItem]);
  };

  const handleChangePage = (newPage: number) => {
    setPage((page) => {
      const newPageUrl = page > newPage ? previous : next;
      getSearchResultsByCategory(newPageUrl);
      return newPage;
    });
  };

  const handleEditSave = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], ["name"]: value };
    setItems(updatedItems);
  };

  return (
    <Container>
      <HeaderContainer>
        <Header>{capitalizeFirstLetter(category || "")}</Header>
        <Button onClick={handleCreate}>Create</Button>
      </HeaderContainer>
      {loadingByCategory ? (
        <Loader />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((item, index) => (
                <TableRow key={item.url}>
                  <TableCell component="th" scope="row">
                    {editMode === index ? (
                      <TextField
                        value={item.name}
                        onChange={(e) => handleEditSave(e, index)}
                      />
                    ) : (
                      item.name || item.title
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.url)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={count || 0}
            rowsPerPage={10}
            page={page}
            onPageChange={(e, page) => handleChangePage(page)}
            labelRowsPerPage=""
          />
        </TableContainer>
      )}
    </Container>
  );
};

export default CategoryPage;

const Header = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #555;
  width: 100%;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
`;

const HeaderContainer = styled.div`
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;
