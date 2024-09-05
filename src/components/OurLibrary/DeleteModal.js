import React, { useState } from "react";
import { TbTrashXFilled } from "react-icons/tb";
import axios from "axios";

export default function DeleteModal(props, title) {
  const [modal, setModal] = useState(false);

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
      .delete(`http://localhost:3000/Books/${props.book.id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")
            .content,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          window.location.replace("http://localhost:3000/Books");
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
          <div className="modal-content">
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