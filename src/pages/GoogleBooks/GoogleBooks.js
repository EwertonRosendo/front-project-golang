import React, { useState, useEffect } from "react";
import SearchBook from "../../components/GoogleBooks/SearchBook";
import ListBooks from "../../components/GoogleBooks/ListBooks";
import { useCookies } from "react-cookie";
import axios from "axios";

import "./styles.css";

const GoogleBooks = (props) => {
  const [books, setBooks] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Certifique-se de incluir 'token'

  useEffect(() => {
    const url = "http://localhost:5000/googlebooks";

    axios.get(url)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  console.log(cookies.id);

  return (
    <React.Fragment>
      <SearchBook booksList={setBooks} />
      <ListBooks books={books} />
    </React.Fragment>
  );
};

export default GoogleBooks;
