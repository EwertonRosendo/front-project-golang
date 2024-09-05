import React, { useState, useEffect } from "react";
import SearchBook from "../../components/GoogleBooks/SearchBook";
import ListBooks from "../../components/GoogleBooks/ListBooks";

import "./styles.css"


const GoogleBooks = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5000/googlebooks";
    fetch(url)
      .then((res) => {
        console.log(res.data)
        if (res.ok) {
          
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setBooks(res));
  }, []);

  return (
    <React.Fragment>
      <SearchBook booksList={setBooks} />
      <ListBooks books={books} />
    </React.Fragment>
  );
};
export default GoogleBooks;