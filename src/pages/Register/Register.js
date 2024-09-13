import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";

const Register = (props) => {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  function handleInputChange(event) {
    const { id, value } = event.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const handleSignUpClick = () => {
    axios
      .post("http://localhost:5000/users", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        }
      });
  };

  return (
    <React.Fragment>
      <div className="box">
        <div className="login">
          <p>Sign Up here!</p>
          <div className="input name">
            <label htmlFor="">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name.."
              onChange={handleInputChange}
            />
          </div>
          <div className="input email">
            <label htmlFor="">Email</label>
            <input
              id="email"
              type="email"
              placeholder="exemple@gmail.com.."
              onChange={handleInputChange}
            />
          </div>

          <div className="input nickname">
            <label htmlFor="">nickname</label>
            <input
              id="nick"
              type="text"
              placeholder="nickname.."
              onChange={handleInputChange}
            />
          </div>

          <div className="input password">
            <label htmlFor="">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password.."
              onChange={handleInputChange}
            />
          </div>

          <div className="buttons">
            <button className="up" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
