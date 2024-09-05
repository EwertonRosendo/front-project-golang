import React, { useState } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

export default function DeleteModal(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleDeleteReview = (id) => {
    axios
      .delete(`http://localhost:3000/reviews/${props.id}`)
      .then((response) => {
        if (response.status == 200) {
          window.location.reload();
        }
      });
  };

  return (
    <>
      <DeleteOutlined
        className="btn-modal"
        onClick={toggleModal}
        style={{ fontSize: "24px" }}
      />

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Delete this review!</h2>
            <p>
              You are about to delete your review about "{props.book}". this
              will remove your review permanently.
            </p>
            <p>Are you sure you want to do this?</p>
            <div className="modal-buttons">
              <button onClick={toggleModal} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleDeleteReview} className="agree-button">
                Yes, I want to delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}