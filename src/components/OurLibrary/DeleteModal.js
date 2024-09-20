import React, { useState } from "react";
import { TbTrashXFilled } from "react-icons/tb";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function DeleteModal(props, title) {
  const [modal, setModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const delete_book = () => {
    axios
      .delete(`http://localhost:5000/books/${props.book.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.token.token || null}`
        },
      })
      .then((response) => {
        if (response.status == 200) {
        }
      });
  };

  return (
    <>
      <button className="delete-button" onClick={toggleModal}>
        <pre>
          <TbTrashXFilled fontSize={"20px"} />{" "}
        </pre>
        Delete this book
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-book">
            <h2> Delete {props.title}</h2>
            <div>
              <p>
                You are about to delete the book "{props.title}". this will
                remove the book permanently.
              </p>
              <p>Are you sure you want to do this?</p>
            </div>
            <div
              className="modal-buttons"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <button onClick={toggleModal} className="cancel-button">
                Cancel
              </button>
              <button onClick={delete_book} className="agree-button">
                Yes, I want to delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
