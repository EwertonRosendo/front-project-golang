import React, { useState } from "react";
import axios from "axios";

export default function Modal(props) {
  const [book, setBook] = useState({});
  const [ratings, setRatings] = useState([1, 2, 3, 4, 5]);
  const [formData, setFormData] = useState();
  const [modal, setModal] = useState(false);

  const postReview = () => {
    axios
      .post(
        `http://localhost:3000/Books/${props.user_id}/reviews.json`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        if (response.status == 200) {
          window.location.replace("http://localhost:3000/reviews");
        }
      });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      book: props.book,
      review: {
        cover_url: props.cover,
      },
      [id]: value,
    });
  };
  const handleRatings = ratings.map((rating, index) => {
    return (
      <option key={index} value={rating}>
        {rating}
      </option>
    );
  });
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
        Create review
      </button>

      {modal && (
        <div className="modal modal-create-review">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-review">
            <h2>Create a new review about {props.book.title}</h2>
            <div className="content">
              <div className="review">
                <div className="book-image">
                  <img src={props.cover} alt="" height={"200px"} />
                </div>
                <div className="review-info">
                  <p>{book.title}</p>
                  <div>
                    <select id="status" onChange={handleInputChange}>
                      <option className="option" value="999">
                        Select your status*
                      </option>
                      <option className="option" value="to_read">
                        To Read
                      </option>
                      <option className="option" value="reading">
                        Reading
                      </option>
                      <option className="option" value="read">
                        Read
                      </option>
                    </select>
                  </div>
                  <div>
                    <select id="rating" onChange={handleInputChange}>
                      <option value="999">Set your rating*</option>
                      {handleRatings}
                    </select>
                  </div>
                </div>
                <div className="book-opinion">
                  <label htmlFor="">Describe your opinion here*</label>
                  <textarea
                    onChange={handleInputChange}
                    name="book_opinion"
                    id="book_opinion"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-buttons">
              <button onClick={toggleModal} className="cancel-button">
                Cancel
              </button>
              <button onClick={postReview} className="agree-button">
                Create review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
