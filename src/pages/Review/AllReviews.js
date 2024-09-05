import React, { useState, useEffect } from "react";
import axios from "axios";

import Reviews from "../../components/Review/Reviews";
import "./AllReviews.css";


const AllReviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [yourReviews, setYourReviews] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/reviews.json";
    axios.get(url).then((response) => {
      if (response.data) {
        setReviews(response.data);
      } else {
        throw new Error("Network response was not ok.");
      }
    });
  }, []);
  useEffect(() => {
    if (props.user_id) {
      const url = `http://localhost:3000/reviews/user/${props.user_id}.json`;
      axios.get(url).then((response) => {
        if (response.data) {
          setYourReviews(response.data);
        } else {
          throw new Error("Network response was not ok.");
        }
      });
    }
  }, []);

  return (
    <React.Fragment>
      {props.user_id ? (
        <Reviews
          reviews={yourReviews}
          owner={"Your reviews"}
          user_id={props.user_id}
        />
      ) : null}
      <Reviews
        reviews={reviews}
        owner={"Others reviews"}
        user_id={props.user_id}
      />
    </React.Fragment>
  );
};
export default AllReviews;