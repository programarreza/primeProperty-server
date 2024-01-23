const express = require("express");
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const jwt = require("jsonwebtoken");

// Import db
require("./db/connection");

// Import Schema
const Users = require("./models/Users");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("prime property server is running ");
});

app.post("/api/register", async (req, res, next) => {
  try {
    const { fullName, number, email, password } = req.body;

    if (!fullName || !number || !email || !password) {
      res.send(400).send("Please fill all required fields");
    } else {
      const isAlreadyExist = await Users.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User already exists");
      } else {
        const newUser = new Users({ fullName, number, email });
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).send("User registered Successfully");
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
});



app.listen(port, () => {
  console.log(`prime property server port ${port}`);
});
