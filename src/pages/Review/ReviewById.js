import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rate } from "antd";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const ReviewById = (props) => {
  const [review, setReview] = useState({});
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const postComment = () => {
    axios
      .post(`http://localhost:3000/reviews/${id}/comments`, {
        content: comment,
        likes: 0,
        review_id: id,
      })
      .then((response) => {
        if (response.status === 200) {
          
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/reviews/${id}.json`)
      .then((response) => {
        setUser(response.data.user);
        setReview(response.data);
        setBook(response.data.book);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/reviews/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleDeleteComment = (review_id, id) => {
    if (!window.confirm("Do you realy want to delete this comment?")) {
      return;
    }
    axios
      .delete(`http://localhost:3000/reviews/${review_id}/comments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          
        }
      });
  };

  const commentsComponent = comments.map((comment, index) => (
    <div key={comment.id}>
      <div className="comment">
        <div className="comment-photo">
          <FaRegUserCircle fontSize={"30px"} />
          <p>reader</p>
        </div>

        <div className="comment-info">
          <div className="username">
            <div>
              <p>{comment.user.name}</p>
            </div>
            <div>
              <p>{comment.created_at.substring(0, 10)}</p>
            </div>
          </div>
          <div className="comment-content">
            <p>{comment.content}</p>
          </div>
          {comment.user.id == props.user_id ? (
            <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
              <a
                className="delete-comment"
                onClick={() => handleDeleteComment(id, comment.id)}
              >
                delete your comment
              </a>
            </div>
            
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ));
  return (
    <React.Fragment>
      <div className="content">
        <div className="review">
          <div className="book-image">
            <img
              src={review.cover_url ? review.cover_url : book.url_image}
              alt=""
            />
          </div>
          <div className="book-info">
            <p>{book.title}</p>
            <p>Reviewed by {user.name}</p>
            <p>Status: {review.status}</p>
            <div className="rating">
              <p>Rating: </p>
              <Rate disabled value={review.rating} />
            </div>
          </div>
        </div>
        <div className="opinion">
          <p>{review.book_opinion}</p>
        </div>
        <div className="comments">
          <div style={{ display: "flex" }}>
            <div className="avatar">
              <FaRegUserCircle fontSize={"30px"} />
            </div>
            <div className="comment-now">
              <div style={{ width: "100%" }}>
                <textarea
                  maxLength="200"
                  minLength="10"
                  name=""
                  id=""
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="type your comment here.."
                ></textarea>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button onClick={postComment}>Comment</button>
              </div>
            </div>
          </div>

          {commentsComponent}
        </div>
      </div>
    </React.Fragment>
  );
};
export default ReviewById;