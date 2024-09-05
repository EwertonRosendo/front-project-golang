import React, { useState } from "react";
import { Rate } from "antd";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa6";

import DeleteModal from "./DeleteModal";

const Reviews = (props) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = props.reviews.slice(firstPostIndex, lastPostIndex);

  const nextPage = () => {
    if (props.reviews.length > lastPostIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const showAllReviews = (reviews) => {
    return reviews.map((review, index) => {
      const author = review.book.author?.name || "No author";
      const rating = review.rating;

      return (
        <div key={index} className="review">
          <div className="user-info">
            <div className="owner">
              <FaUserAstronaut fontSize={"25px"} />
              <p>{review.user.name}</p>
            </div>
            <div className="book-mark">
              <BsBookmarkCheckFill
                style={{ color: "#63A757", borderTopLeftRadius: "0px" }}
                fontSize={"40px"}
              />
            </div>
          </div>
          <div className="book-image">
            <img
              src={review.cover_url || review.book.url_image}
              alt={review.book.title}
            />
          </div>
          <div className="book-review">
            <p className="title">
              {review.book.title.split(" ").length < 13
                ? review.book.title
                : `${review.book.title.split(" ").slice(0, 13).join(" ")}..`}
            </p>
            <p>{author}</p>
            <div className="rating">
              <Rate style={{ fontSize: "30px" }} disabled value={rating} />
            </div>
            <div className="review-buttons">
              <button
                className="show-review"
                onClick={() => navigate(`/reviews/${review.id}`)}
              >
                Show Review
              </button>
              {props.user_id === review.user.id && (
                <DeleteModal book={review.book.title} id={review.id} />
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="reviews">
        <h2>{props.owner}</h2>
        <div className="your-reviews">{showAllReviews(currentPosts)}</div>
      </div>
      <div className="pagination-box">
        <div className="pagination">
          {currentPage > 1 && <button onClick={prevPage}>Prev</button>}
          <p>
            {currentPage} / {Math.ceil(props.reviews.length / postsPerPage)}
          </p>
          {props.reviews.length > lastPostIndex && (
            <button onClick={nextPage}>Next</button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Reviews;
