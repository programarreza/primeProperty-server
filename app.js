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

app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send(400).send("Please fill all required fields");
    } else {
      const user = await Users.findOne({ email });
      if (!user) {
        res.status(400).send("User email or password is incorrect");
      } else {
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
          res.status(400).send("User email or password is incorrect");
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";
          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 84600 },
            async (err, token) => {
              await Users.updateOne(
                { _id: user._id },
                {
                  $set: { token },
                }
              );
              user.save();
              next();
            }
          );

          res.status(200).json({ user: {email:user.email, fullName: user.fullName, number: user.number}, token: user.token });
        }
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
});

app.listen(port, () => {
  console.log(`prime property server port ${port}`);
});
