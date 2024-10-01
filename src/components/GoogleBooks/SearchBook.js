import React, { useState } from "react";
import axios from "axios";

const GoogleBooks = (props) => {
  const [title, setTitle] = useState("");
  const handleSeachTitle = () => {
    axios
      .get(`http://localhost:5000/googlebooks/${title}`)
      .then((response) => {
        props.booksList(response.data);
      })
      .catch((e) => {
        props.booksList([
          {
            title: "Books weren't found",
            thumbnail:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1f4C-cWV03_czRXhL1THkOdS9RDnAtPxRnA&s",
          },
        ]);
      });
  };

  return (
    <React.Fragment>
      <div className="google-search">
        <input
          type="search"
          style={{fontSize:"17px"}}
          placeholder={"Search book by title"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={handleSeachTitle}>Search</button>
      </div>
    </React.Fragment>
  );
};
export default GoogleBooks;
