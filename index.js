const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const moment = require("moment");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view ngine

app.set("view engine", "ejs");
const port = process.env.PORT || 5000;
// db info
const username = process.env.NAME;
const password = process.env.SECRET_KEY;
// all Router
const today = moment().format("MMMM Do YYYY");

// database configuration starts here
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@todo.c4g5c.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connet");
  })
  .catch((err) => {
    console.log(err);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  post: String,
  time: String,
});

const Blog = mongoose.model("Blog", blogSchema);

// database configuration ends here

app.get("/", (req, res) => {
  Blog.find((err, blog) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("home", { title: "Home", blog: blog });
    }
  });
});
app.get("/compose", (req, res) => {
  res.render("compose", { title: "Compose" });
});

app.post("/compose", (req, res) => {
  const title = req.body.title;
  const post = req.body.postbody;
  const dpost = new Blog({
    title: title,
    post: post,
    time: today,
  });
  dpost.save();
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  let needTitle = req.params.postName;

  Blog.findOne({ title: needTitle }, (err, fpost) => {
    if (err) {
      res.redirect("/");
    } else {
      res.render("post", { fpost });
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
