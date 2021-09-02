const express = require("express");

const app = express();
app.use(express.json());

const helloWorldHandler = (req, res, ctx) => {
  return res.send("hello world");
};

const loginHandler = (req, res, ctx) => {
  const {username, password} = req.body;
  const validUser = {username: "jane doe", password: "123456"};
  console.log({username, password});
  if (username === validUser.username && password === validUser.password) {
    return res.send("ok");
  }
  return res.status(500).send({error: "incorrect username or password"});
};

app.get("/", helloWorldHandler);
app.put("/api/login", loginHandler);

console.log("server starting......");
app.listen(3000);
