import React, { useState } from "react";
import axios from "axios";
import { FontSizeOutlined } from "@ant-design/icons";
import { TiPencil } from "react-icons/ti";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuTextSelect } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";
import { useCookies } from "react-cookie";
export default function Modal() {
  const [modal, setModal] = useState(false);
  
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Certifique-se de incluir 'token'
  const [formFile, setFormFile] = useState({
    title: "",
    "form-id": null,
  });

  const handleFileChange = (event) => {
    setFormFile({
      "form-id": event.target.files[0],
    });
  };

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    published_at: "",
    url_image: "no_url",
    description: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAddBook();
  };

  const handleAddBook = () => {
    console.log(modal);
    axios
      .post("http://localhost:5000/books/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toggleModal();
          axios.post(
            `http://localhost:5000/files/${response.data.id}`,
            formFile,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${cookies.token.token}`
              },
            },
          );
        }
      })
      .catch((e) => console.log(e));
    console.log(modal);
  };

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
      <button onClick={toggleModal} className="btn-modal">
        Create a new book
      </button>

      {modal && (
        <div className="modal modal-create-book">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-book">
            <h2>Create or Add a Book!</h2>
            <div className="content">
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <div
                  className="both-inputs"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <div className="left-inputs">
                    <div>
                      <p>
                        <FontSizeOutlined /> Title*
                      </p>
                      <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder={"Book title.."}
                        required
                      />
                    </div>
                    <div>
                      <p>
                        <TiPencil /> Author*
                      </p>
                      <input
                        id="author"
                        type="text"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder={"Author.."}
                        required
                      />
                    </div>
                    <div>
                      <p>
                        <TiPencil /> Sutbtitle*
                      </p>
                      <input
                        id="subtitle"
                        type="text"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        placeholder={"subtitle.."}
                        required
                      />
                    </div>
                    <div>
                      <p>
                        <FaRegBuilding /> Publisher*
                      </p>
                      <input
                        id="publisher"
                        type="text"
                        value={formData.publisher}
                        onChange={handleInputChange}
                        placeholder={"Publisher.."}
                        required
                      />
                    </div>
                    <div>
                      <p>
                        <FaRegCalendarAlt /> Published at*
                      </p>
                      <input
                        id="published_at"
                        type="date"
                        value={formData.published_at}
                        onChange={handleInputChange}
                        placeholder={"Published at.."}
                        required
                      />
                    </div>
                    <br />
                    <div className="input-file">
                      <label htmlFor="form-id">
                        <MdOutlineFileUpload
                          fontSize={"40px"}
                          color="#A76657"
                        />
                      </label>
                      <label htmlFor="form-id">
                        Drop a file or click to upload
                      </label>
                      <input
                        type="file"
                        id="form-id"
                        name="form-id"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>
                  <div className="descrip">
                    <p>
                      <LuTextSelect /> Description*
                    </p>
                    <textarea
                      id="description"
                      className="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={"Book description.."}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="add-cancel-button">
                  <button className="cancel-button" onClick={toggleModal}>
                    Cancel
                  </button>
                  <button type="submit" className="add-button">
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
