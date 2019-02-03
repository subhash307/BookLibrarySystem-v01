import axios from "axios";
import { GET_ERRORS, GET_BOOKS, DELETE_BOOK, GET_BOOK, DELETE_ALL_BOOKS } from "./types";

export const addBook = (book_library, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/board", book_library);
    history.push("/");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getBacklog = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/board/all");
  dispatch({
    type: GET_BOOKS,
    payload: res.data
  });
};

export const deleteBook = book_id => async dispatch => {
  if (
    window.confirm(
      `You are deleting book ${book_id}, this action cannot be undone`
    )
  ) {
    await axios.delete( `http://localhost:8080/api/board/${book_id}`);
    dispatch({
      type: DELETE_BOOK,
      payload: book_id
    });

  }
};


export const getBook = (book_id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/board/${book_id}`)
    dispatch({
      type: GET_BOOK,
      payload: res.data
    })
  } catch (error) {
    history.push("/");
  }
};

export const deleteAllBooks = () => async dispatch => {
  if (
    window.confirm(
      "You are deleting all the books, this action cannot be undone"
    )
  ) {
    const res = await axios.delete( "http://localhost:8080/api/board/delete-all");
    dispatch({
      type: DELETE_ALL_BOOKS,
      payload: res.data
    });

  }
};