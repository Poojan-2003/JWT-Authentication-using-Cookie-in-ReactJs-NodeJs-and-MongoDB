import React, { useEffect } from "react";
import Cookies from "js-cookie";

import jwt from "jsonwebtoken";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const tk = Cookies.get("token");
  console.log(tk);
  if (tk === undefined) {
    return <h1>You are unauthorized</h1>;
  }

  try {
    const decoded = jwt.verify(tk, "MySecretToken");
    if (decoded) {
      return <div>Authorized</div>;
    } else {
      return <div>unauthorized</div>;
    }
  } catch (err) {
    return <div>{err.message}</div>;
  }

  return <div></div>;
};

export default Home;
