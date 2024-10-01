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

            <div>
              <div>
                <svg
                  id="failureAnimation"
                  viewBox="0 0 70 70"
                  width="200"
                  height="200"
                >
                  <circle
                    id="failureAnimationCircle"
                    cx="35"
                    cy="35"
                    r="24"
                    stroke="#D50000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                  <polyline
                    className="failureAnimationCheckLine"
                    stroke="#D50000"
                    strokeWidth="3"
                    points="25,25 45,45"
                    fill="transparent"
                  />
                  <polyline
                    className="failureAnimationCheckLine"
                    stroke="#D50000"
                    strokeWidth="3"
                    points="45,25 25,45"
                    fill="transparent"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
