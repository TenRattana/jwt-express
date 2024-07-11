require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const user = require("./model/user");
const app = express();
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
      res.status(400).send("All Input is reqired");
    }

    const oldUser = await user.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exist.");
    }
    encryptedPassword = await brcypt.hash(password, 10);

    const person = await user.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { person_id: person._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    person.token = token;

    res.status(201).json(person);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email, password)) {
      res.status(400).send("All Input is required");
    }

    const person = await user.findOne({ email });

    if (person && (await brcypt.compare(password, person.password))) {
      const token = jwt.sign(
        {
          person_id: person._id,
          email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      person.token = token;
      res.status(200).json(person);
    }
    res.status(400).send("Invalid");
  } catch (error) {
    console.log(error);
  }
});

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = app;
