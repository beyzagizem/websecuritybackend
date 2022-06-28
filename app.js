const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var bodyParser = require("body-parser");
const User = require("./userModel");

// Start express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.enable("trust proxy");
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
// 1) GLOBAL MIDDLEWARES
// Implement CORS
//app.use(cors());

//app.options("*", cors());
// app.options('/api/v1/tours/:id', cors());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3) ROUTES
app.get("/", (req, res) => {
  res.send("hello express app");
});

app.post("/login", async (req, res) => {
  console.log("user infos:", req.body);
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  return res.status(200).json({
    status: "success",
    message: "user saved to db",
    data: newUser,
  });
});

module.exports = app;
