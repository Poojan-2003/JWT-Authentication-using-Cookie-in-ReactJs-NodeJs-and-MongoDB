import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const LoginSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email,
        Password,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.success === true) {
      var expiration_date = new Date();
      var cookie_string = "";
      expiration_date.setFullYear(expiration_date.getFullYear() + 1);
      cookie_string =
        "test_cookies=true; path=/; expires=" + expiration_date.toUTCString();
      cookie_string =
        `token=${data.token}; path=/; expires=` + expiration_date.toUTCString();
      document.cookie = cookie_string;
      navigate("/Home");
    }
  };

  return (
    <div className="MainDiv">
      <div className="heading">Login Page</div>
      <form onSubmit={LoginSubmit}>
        <div>
          <input
            className="inp"
            required
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inp"
            required
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>

      <Link to="/Signup" className="nav">
        Click here to Signup
      </Link>
    </div>
  );
}

export default Login;
