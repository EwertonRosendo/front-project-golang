import React from "react";

export default function ModalConfirmation(props) {
  const toggleModalConfirmation = () => {
    props.setShowModalConfirmation(!props.showModalConfirmation);
  };

  if (props.showModalConfirmation) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {props.showModalConfirmation && (
        <div className="modal">
          <div onClick={toggleModalConfirmation} className="overlay"></div>
          <div
            className="modal-content-book"
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
