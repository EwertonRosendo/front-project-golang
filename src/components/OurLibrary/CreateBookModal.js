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
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleFileChange = (event) => {
    setFormData({
      "form-id": event.target.files[0],
    });
  };

  const [formData, setFormData] = useState({
    title: undefined,
    author: undefined,
    subtitle: undefined,
    publisher: undefined,
    published_at: undefined,
    description: undefined,
    "form-id": null,
  });

  const handleInputChange = (event) => {
    console.log(event.target.value)
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData)

    handleAddBook();
  };

  const handleAddBook = () => {
    console.log(modal);
    axios
      .post("http://localhost:5000/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.token.token || null}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toggleModal();
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:"20px"
        }}
      >
        <button onClick={toggleModal} className="agree-button" style={{width:"250px", fontSize:"18px"}}>
          Create a new book
        </button>
      </div>

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
                        className="authors"
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
                        className="subtitle"
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
                        className="publisher"
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
                        className="published_at"
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
                <div className="add-cancel-button" style={{display:"flex",  flexDirection:"row"}}>
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
