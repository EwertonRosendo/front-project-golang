import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./AllReviews.css";
import { useCookies } from "react-cookie";

export default function ModalCreateReview(props) {
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([1, 2, 3, 4, 5]);
  const [formData, setFormData] = useState();
  const [modal, setModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Certifique-se de incluir 'token'

  const postReview = () => {
    axios
      .post(`http://localhost:5000/reviews/add`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token.token || null}`,
        },
      })
      .then((response) => {
        if (response.status == 201) {
          navigate(`/reviews/${response.data.id}`);
        }
      });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    // Spread previous formData to maintain existing data
    setFormData((prevData) => ({
      ...prevData,
      book: {
        id: props.book.id,
      },
      user: {
        id: cookies.id,
      },
      [id]: value, // Update the specific field that changed
    }));
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
      <button onClick={toggleModal} className="agree-button" style={{width:"150px", fontSize:"18px"}}>
        Create review
      </button>

      {modal && (
        <div className="modal modal-create-review">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-review" style={{height:"700px"}}>
            <h2>Create a new review about {props.book.title}</h2>
            <div className="content">
              <div className="review">
                <div className="book-image">
                  <img
                    src={"http://localhost:5000/static/" + props.book.thumbnail}
                    alt=""
                    height={"200px"}
                  />
                </div>
                <div className="review-info">
                  <p>{book.title}</p>
                  <div>
                    <select id="status" onChange={handleInputChange}>
                      <option className="option" value={999}>
                        Select your status*
                      </option>
                      <option className="option" value={1}>
                        To Read
                      </option>
                      <option className="option" value={2}>
                        Reading
                      </option>
                      <option className="option" value={3}>
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
                    id="review"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-buttons" style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", width:"100%"}}>
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
