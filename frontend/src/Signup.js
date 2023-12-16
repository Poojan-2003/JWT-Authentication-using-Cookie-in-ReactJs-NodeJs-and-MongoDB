import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const SignupSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Email,
        Password,
      }),
    });
    const data = await response.json();
    console.log(data);
    console.log(data.status);

    if (data === "User already exists") {
      alert("User already exists");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="MainDiv">
      <div className="heading1">SignUp</div>
      <form onSubmit={SignupSubmit}>
        <div>
          <input
            className="inp"
            type="text"
            required
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inp"
            type="email"
            required
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inp"
            type="password"
            required
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div>
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>

      <div className="nav1">
        Already have account?<Link to="/">Click here to Login </Link>
      </div>
    </div>
  );
};

export default Signup;
