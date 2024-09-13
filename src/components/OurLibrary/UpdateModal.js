import React, { useState } from "react";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";

export default function Update(props, title) {
  const [modal, setModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const update_book = () => {
    axios
      .put(
        `http://localhost:5000/books/${props.id}`,
        {
          title: props.title,
          publisher: props.publisher,
          published_at: props.published_at,
          description: props.description,
          authors: props.author,
          id: cookies.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        if (response.status === 204) {
          axios.post(
            `http://localhost:5000/files/${props.id}`,
            props.formFile,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
        }
      });
  };
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
      <button className="update-button" onClick={toggleModal}>
        Save Chances
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-book" style={{ height: "300px" }}>
            <h2>Update {props.title}</h2>
            <div>
              <p>
                You are about to update the book "{props.title}". this will
                update the book permanently.
              </p>
              <p>Are you sure you want to do this?</p>
            </div>
            <div className="modal-buttons">
              <button onClick={toggleModal} className="cancel-button">
                Cancel
              </button>
              <button onClick={update_book} className="agree-button">
                Yes, I want to update it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
