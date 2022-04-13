import * as newsService from "../NewsService.js";
import express from "express";
import session from "express-session";

var app = express();
app.set("view engine", "ejs");
app.set("views", "activity2/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "MAGICALEXPRESSKEY",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);
app.listen(3002);

const file = "newsStories/news.json";

app.get("/", function (req, res) {
  if (!req.session.userName) {
    res.redirect("/login");
  } else {
    res.render("index", { userName: req.session.userName });
  }
});

app.post("/", function (req, res) {
  req.session.userName = req.body.userName;
  res.render("index", { userName: req.session.userName });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/stories/:author?/:title?/:startDate?/:endDate?", function (req, res) {
  newsService.setFile(file);
  newsService.setFilters(req.query.title, req.query.author);
  newsService.setDateFilter(req.query.startDate, req.query.endDate);
  let filtered = newsService.filter();
  newsService.clearFilters();
  res.render("stories", { data: filtered });
});

app.get("/select/:headline?/:content?/:delete?", function (req, res) {
  newsService.setFile(file);
  let stories = newsService.filter();
  res.render("select", { data: stories, type: req.query });
});

app.post("/updateHeadline", function (req, res) {
  newsService.setFile(file);
  try {
    newsService.updateHeadline(req.body.selected, req.body.headline);
    res.render("updated", { op: "headline" });
  } catch (err) {
    res.render("error");
  }
});

app.post("/updateContent", function (req, res) {
  newsService.setFile(file);
  try {
    newsService.updateContent(req.body.selected, req.body.content);
    res.render("updated", { op: "content" });
  } catch (err) {
    res.render("error");
  }
});

app.post("/deleteStory", function (req, res) {
  newsService.setFile(file);
  try {
    for (var i in req.body.selected) {
      newsService.deleteStory(req.body.selected[i]);
    }
    res.render("updated", { op: "deleted" });
  } catch (err) {
    res.render("error");
  }
});

app.post("/addStory", function (req, res) {
  newsService.setFile(file);
  try {
    newsService.addStory(
      req.body.title,
      req.body.author,
      req.body.public,
      req.body.content
    );
    res.render("updated", { op: "added" });
  } catch (err) {
    res.render("error");
  }
});
