const express = require("express");
const app = express();
const _ = require("lodash");
const { post } = require("./post");
const path = require("path");

let a = "Hello World";

// import express from "express";

// import extrnal from "./date.js";
// import post from "./post.js";

// middleware

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view ngine

app.set("view engine", "ejs");

// all Router

app.get("/", (req, res) => {
  res.render("home", { title: "Home", post });
  // console.log(post);
});

// app.get("/post", (req, res) => {
//   res.render("post", { post });
//   // console.log(post);
// });
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});
app.get("/compose", (req, res) => {
  res.render("compose", { title: "Compose" });
});

app.post("/compose", (req, res) => {
  // res.send("success");
  let postt = {
    title: req.body.title,
    postbody: req.body.postbody,
  };
  post.push(postt);
  res.redirect("/");
});

app.get("/test/:name", (req, res) => {
  res.render("test", { fPost: post, name: req.params.name });
  console.log(req.params.name);
});

app.get("/posts/:postName", (req, res) => {
  let needTitle = _.lowerCase(req.params.postName);
  let fPost = {};
  console.log(needTitle);
  let fposts = post.find((element) => _.lowerCase(element.title) === needTitle);
  if (fposts) {
    fPost = {
      title: fposts.title,
      postbody: fposts.postbody,
    };
  } else {
    res.redirect("/");
  }
  res.render("post", { fPost });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
