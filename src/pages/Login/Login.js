import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // Adicione o hook useNavigate
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  function handleInputChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const handleSignIn = () => {
    axios
      .post("http://localhost:5000/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 202) {
          setCookie("token", response.data, { path: "/", httpOnly: false });
          setCookie("id", response.data.id, { path: "/", httpOnly: false });
          setCookie("nick", response.data.nick, { path: "/", httpOnly: false });
          setCookie("name", response.data.name, { path: "/", httpOnly: false });
          setCookie("email", response.data.email, {
            path: "/",
            httpOnly: false,
          });
          setCookie("image", response.data.UserImage, {
            path: "/",
            httpOnly: false,
          });
          navigate("/GoogleBooks");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <React.Fragment>
      <div className="box">
        <div className="login">
          <p>Sign In here!</p>

          <div className="input email">
            <img
              role="img"
              src={
                "https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-cartoon-unbuttoned-book-image_1321550.jpg"
              }
              alt=""
            />
          </div>

          <div className="input email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="exemple@gmail.com.."
              onChange={handleInputChange}
            />
          </div>

          <div className="input password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password.."
              onChange={handleInputChange}
            />
            <p>
              <a href="#">Did you forget your password?</a>
            </p>
          </div>

          <div className="buttons">
            <button onClick={handleSignIn} className="in">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
