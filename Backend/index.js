const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/auth-demo")
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
});

const userModel = mongoose.model("users", userSchema);

app.post("/register", async (req, res) => {
  const { Name, Email, Password } = req.body;

  if (!(Name && Email && Password)) {
    res.status(400).json("All fields are compulsory");
    return;
  }
  const existingUser = await userModel.findOne({ email: Email });
  if (existingUser) {
    res.status(400).json("User already exists");
    return;
  }

  const encryptedPassword = await bcrypt.hash(Password, 10);
  const user = await userModel.create({
    name: Name,
    email: Email,
    password: encryptedPassword,
  });

  const token = jwt.sign({ id: user._id }, "MySecretToken", {
    expiresIn: "2h",
  });

  user.token = token;
  res.status(201).json(user);

  
});

app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await userModel.findOne({ email: Email });

    if (!user) {
      res.status(400).json("User does not Exists");
      return;
    }
    if (user && (await bcrypt.compare(Password, user.password))) {
      const token = jwt.sign({ id: userModel._id }, "MySecretToken", {
        expiresIn: "2h",
      });
      console.log(token);

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };
      console.log(2);
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    } else if (user) {
      res.send({ message: "Incorrect Password" });
    } else {
      res.send({ message: "Email Does not exists" });
    }
  } catch (err) {
    console.log(err);
  }

});

app.get("/getdata", verifyToken, (req, res) => {
  res.send({ message: "I am a bad developer with a good heart" });
});

function verifyToken(req, res, next) {
  let token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "MySecretToken", (err, data) => {
    if (!err) {
      console.log(data);
      next();
    } else {
      res.status(401).send({ message: "Invalid Token please login again" });
    }
  });
}

app.listen(8000, () => {
  console.log("Server is up and running");
});
