import React from "react";

export default function ConfirmationModal(props) {
  const toggleModal = () => {
    props.setShowModal(!props.showModal);
  };

  if (props.showModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {props.showModal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div
            className="modal-content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h2>{props.message}</h2>

            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
