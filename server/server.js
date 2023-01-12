const express = require("express");
const cors = require("cors");
const app = express();

const users = [];
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/", (req, res) => {
  const { email, firstName, lastName } = req.body;
  console.log(`your email is ${email}`);

  users.push({
    email: email,
    firstName: firstName,
    lastName: lastName,
  });
});
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/message", (req, res) => {
  res.json("welcome");
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
