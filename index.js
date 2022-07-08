const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const _ = require("lodash");
const { post } = require("./post");
const moment = require("moment");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view ngine

app.set("view engine", "ejs");

// all Router
const today = moment().format("MMMM Do YYYY");

// database configuration starts here
mongoose.connect("mongodb://localhost:27017/blogSite", () => {
  console.log("connet");
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
  // res.send("success");
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

app.get("/test/:name", (req, res) => {
  res.render("test", { fPost: post, name: req.params.name });
  console.log(req.params.name);
});

app.get("/posts/:postName", (req, res) => {
  // let needTitle = _.lowerCase(req.params.postName);
  let needTitle = req.params.postName;
  // console.log(needTitle);
  Blog.findOne({ title: needTitle }, (err, fpost) => {
    if (err) {
      res.redirect("/");
    } else {
      res.render("post", { fpost });
    }
  });
  // if (fposts) {
  //   fPost = {
  //     title: fposts.title,
  //     postbody: fposts.postbody,
  //   };
  // } else {
  //   res.redirect("/");
  // }
  // res.render("post", { fPost });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
