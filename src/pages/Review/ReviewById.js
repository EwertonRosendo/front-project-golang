import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rate } from "antd";
import { useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import "./ReviewById.css";

import { useCookies } from "react-cookie";

const ReviewById = (props) => {
  const [review, setReview] = useState({});
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]); // Certifique-se de incluir 'token'

  const postComment = () => {
    axios
      .post(
        `http://localhost:5000/reviews/${id}/comments`,
        {
          comment: comment,
          user: {
            id: parseInt(user.id),
          },
          review: {
            id: parseInt(id),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token.token}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 201) {
          window.location.reload()
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((response) => {
        setUser(response.data.user);
        setReview(response.data);
        setBook(response.data.book);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews/${id}/comments`, {})
      .then((response) => {
        if (response.data == null) {
          return;
        }
        setComments(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleDeleteComment = async (comment_id) => {
    if (!window.confirm("Do you really want to delete this comment?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/comments/${comment_id}/user/${cookies.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies.token.token || null}`,
          },
        },
      );

      if (response.status === 204) {
        window.location.reload()
      } 
    } catch (error) {
      // Handle network or other errors
      console.error("There was an error deleting the comment:", error);
    }
  };
  
  const getStatus = () =>{
    if (review.status == 3){
      return "read"
    }
    else if (review.status == 2){
      return "reading"
    }
    return "to read"
  }

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
              <p>{comment.CreatedAt.substring(0, 10)}</p>
            </div>
          </div>
          <div className="comment-content">
            <p>{comment.comment}</p>
          </div>
          {comment.user.id == cookies.id ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <a
                className="delete-comment"
                onClick={() => handleDeleteComment(comment.id)}
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
      <div className="content-review">
        <div className="review">
          <div className="book-image">
            <img
              src={"http://localhost:5000/static/" + book.thumbnail}
              alt=""
            />
          </div>
          <div className="review-info" style={{justifyContent: "space-evenly"}}>
            <p>{book.title}</p>
            <p>Reviewed by {user.name}</p>
            <p>Status: {getStatus()}</p>
            <div className="rating">
              <p>Rating: </p>
              <Rate disabled value={review.rating} />
            </div>
          </div>
        </div>
        <div className="opinion">
          <p>{review.review}</p>
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

          {comments ? commentsComponent : <></>}
        </div>
      </div>
    </React.Fragment>
  );
};
export default ReviewById;
