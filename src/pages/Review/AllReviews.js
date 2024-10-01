import React, { useState, useEffect } from "react";
import axios from "axios";

import Reviews from "../../components/Review/Reviews";
import "./AllReviews.css";

import { useCookies } from "react-cookie";

const AllReviews = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]); // Certifique-se de incluir 'token'
  const [reviews, setReviews] = useState([]);
  const [yourReviews, setYourReviews] = useState(null);

  useEffect(() => {
    const url = "http://localhost:5000/reviews";
    axios.get(url).then((response) => {
      if (response.data) {
        setReviews(response.data);
      } else {
        console.log(Error("Network response was not ok."));
      }
    });
  }, []);

  useEffect(() => {
    if (cookies.id) {
      const url = `http://localhost:5000/reviews/users/${cookies.id}`;
      axios.get(url).then((response) => {
        if (response.data) {
          setYourReviews(response.data);
        } else {
          console.log(Error("Network response was not ok."));
        }
      });
    }
  }, []);

  return (
    <React.Fragment>
      {yourReviews ? (
        <Reviews
          reviews={yourReviews}
          owner={"Your reviews"}
          user_id={cookies.id}
        />
      ) : (
        <></>
      )}
      <Reviews
        reviews={reviews}
        owner={"Others reviews"}
        user_id={props.user_id}
      />
    </React.Fragment>
  );
};
export default AllReviews;
