import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
export default function Modal(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal review-create">
        Show details
      </button>

      {modal && (
        <div className="modal modal-create">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{props.book.title} detailed</h2>
            <div className="content">
              <div className="box">
                <div className="book-img">
                  <img
                    src={"http://localhost:3000/"+props.book.thumbnail}
                    alt={`${props.book.title} image`}
                    className="bookImage"
                  />
                </div>
                <div className="book-info">
                  <div className="title">
                    <p>{props.book.title}</p>
                  </div>
                  <div>
                    <p>Author: {props.book.authors}</p>
                  </div>
                  <div>
                    <p>Published by {props.book.publisher}</p>
                  </div>
                  <div>
                    <p>Published at: {props.book.published_at}</p>
                  </div>
                  <div className="descrip">
                    <p>Description:</p>
                    <p>
                      {props.book.description
                        ? props.book.description
                        : "There's no description for this book, but you can create"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-buttons">
              <button onClick={toggleModal} className="cancel-button">
                Close
              </button>
              <button
                className="agree-button"
              >
                <NavLink to={`/library/${props.book.id}`}>Edit this book</NavLink>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}