import React, { useState } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
export default function DeleteModal(props) {
  const [modal, setModal] = useState(false);
  
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Certifique-se de incluir 'token'

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleDeleteReview = () => {
    axios
      .delete(`http://localhost:5000/reviews/${props.id}`, 
        {
          headers: {
            Authorization: `Bearer ${cookies.token.token || null}`
          }
        }
      )
      .then((response) => {
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
        <div className="modal-delete-review">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-review">
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
