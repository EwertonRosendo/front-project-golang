import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteModal from "../../components/OurLibrary/DeleteModal";

import UpdateModal from "../../components/OurLibrary/UpdateModal";

import { MdOutlineFileUpload } from "react-icons/md";

import PropTypes from "prop-types";
import axios from "axios";

import "./bookById.css";

const BookById = (props) => {
  const { bookId } = useParams(); // Extract the book ID from the URL

  const baseURL = `http://localhost:5000/books/${bookId}`;
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState();
  const [publisher, setPublisher] = useState("");
  const [published_at, setPublished_at] = useState();
  const [url_image, setUrlImage] = useState("");
  const [image_file, setImageFile] = useState();
  const [cover, setCover] = useState("");

  const [formFile, setFormFile] = useState({
    title: "",
    "form-id": null,
  });

  const handleFileChange = (event) => {
    setFormFile({
      "form-id": event.target.files[0],
    });
  };

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setId(response.data.id);
        setBook(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPublisher(response.data.publisher);
        setPublished_at(response.data.published_at);
        setUrlImage(response.data.url_image);
        setAuthor(response.data.authors);
        setCover(response.data.thumbnail);
      })

      .catch((e) => console.log(e));
  }, []);

  return (
    <React.Fragment>
      <div className="body">
        <div className="box">
          <div className="book-img">
            <img
              src={"http://localhost:5000/static/" + cover}
              alt={`${book.title} image`}
              className="bookImage"
            />
            <DeleteModal book={book} title={book.title} />
          </div>

          <div className="book-info">
            <div>
              <label>Title</label>
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                defaultValue={book.title}
                placeholder={"Book title.."}
              />
            </div>
            <div>
              <label>Author</label>
              <input
                type="text"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                defaultValue={author}
                placeholder={"Author.."}
              />
            </div>
            <div>
              <label>Publisher</label>
              <input
                type="text"
                onChange={(e) => {
                  setPublisher(e.target.value);
                }}
                defaultValue={book.publisher}
                placeholder={"Publisher.."}
              />
            </div>
            <div>
              <label>Published_at</label>
              <input
                type="date"
                onChange={(e) => {
                  setPublished_at(e.target.value);
                }}
                defaultValue={book.published_at}
                placeholder={"Published at.."}
              />
            </div>
            <div className="descrip">
              <label>Description</label>
              <textarea
                className="description"
                type="text"
                rows={4}
                cols={33}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                defaultValue={book.description}
                placeholder={"Book description.."}
                name=""
                id=""
              ></textarea>
            </div>
            <div className="input-file">
              <label htmlFor="form-id">
                <MdOutlineFileUpload fontSize={"40px"} color="#A76657" />
              </label>
              <label htmlFor="form-id">Drop a file or click to upload</label>
              <input
                onChange={handleFileChange}
                type="file"
                name="form-id"
                id="form-id"
                accept="image/png, image/jpeg"
              />
            </div>

            <UpdateModal
              id={id}
              title={title}
              publisher={publisher ? publisher : book.publisher}
              published_at={published_at ? published_at : book.published_at}
              description={description ? description : book.description}
              author={author}
              url_image={url_image ? url_image : book.url_image}
              image_file={image_file}
              formFile={formFile}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
BookById.propTypes = {
  id: PropTypes.string,
};
export default BookById;
