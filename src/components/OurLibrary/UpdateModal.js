import React, { useState } from "react";
import axios from "axios";

export default function Update(props, title) {
  const [modal, setModal] = useState(false);
  const update_book = () => {
    axios
      .put(
        `http://localhost:3000/Books/${props.id}`,
        {
          book: {
            title: props.title,
            publisher: props.publisher,
            published_at: props.published_at,
            description: props.description,
            author: props.author,
            url_image: props.url_image,
            cover: props.image_file,
          },
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")
              .content,
          },
        },
      )
      .then((response) => {
        if (response.status == 200) {
          window.location.replace("http://localhost:3000/Books");
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
          <div className="modal-content">
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