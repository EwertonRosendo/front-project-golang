import React, { useState } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ListBooks = (props) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Certifique-se de incluir 'token'

  const confirmAddBook = (selectedBook) => {
    axios
      .post(
        "http://localhost:5000/googlebooks/add",
        {
          title: selectedBook.title ? selectedBook.title : "no title",
          publisher: selectedBook.publisher
            ? selectedBook.publisher
            : "no publisher",
          published_at: selectedBook.published_at
            ? selectedBook.published_at
            : "no date",
          subtitle: selectedBook.subtitle
            ? selectedBook.subtitle
            : "no subtitle",
          description: selectedBook.description
            ? selectedBook.description
            : "no description",
          authors: selectedBook.authors ? selectedBook.authors : "no author",
          thumbnail: selectedBook.thumbnail
            ? selectedBook.thumbnail
            : "no thumbnail",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        if (response.status === 201) {
          setShowModal(true);
        } else {
          console.log("book already added or something went wrong");
        }
      })
      .catch((e) => console.log(e));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const allBooks = props.books.map((book, index) => (
    <div key={index}>
      <div className="google-book-box">
        <div className="google-book-title-img">
          <img
            src={book["thumbnail"]}
            alt={`${book.title} image`}
            className="google-bookImage"
          />
        </div>
        <div className="google-book-info">
          <p className="google-title">
            {book.title.split(" ").length > 6
              ? book.title.split(" ").slice(0, 6).join(" ") + ".."
              : book.title}
          </p>
          {book.subtitle ? (
            <p>
              {book.subtitle && book.subtitle.split(" ").slice(0, 6).join(" ")}
            </p>
          ) : (
            <></>
          )}
          <p>Author: {book.authors}</p>
          {book["published_at"] ? (
            <p>Published at {book["published_at"]}</p>
          ) : (
            <></>
          )}
          {book["publisher"] ? <p>Publisher: {book["publisher"]}</p> : <></>}
          {cookies.id && cookies["token"] ? (
            <button onClick={() => confirmAddBook(book)}>Add Book</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      <div className="google-main">
        <div className="google-body">{props.books ? allBooks : <></>}</div>
      </div>
    </React.Fragment>
  );
};

export default ListBooks;
