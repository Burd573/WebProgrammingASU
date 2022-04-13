import * as newsService from "../NewsService.js";
import express from "express";
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3001);

const file = "newsStories/news.json";

app.get("/stories/:author?/:title?/:startDate?/:endDate?", function (req, res) {
  newsService.setFile(file);
  newsService.setFilters(req.query.title, req.query.author);
  newsService.setDateFilter(req.query.startDate, req.query.endDate);
  let filtered = newsService.filter();
  newsService.clearFilters();
  res.set("Content-Type", "application/json");
  res.send(filtered);
});

app.post("/updateHeadline", function (req, res) {
  newsService.setFile(file);
  newsService.updateHeadline(req.body.selected, req.body.headline);
  res.set("Content-Type", "application/json");
  res.send(
    "Updated Title: " + JSON.stringify(newsService.getStory(req.body.selected))
  );
});

app.post("/updateContent", function (req, res) {
  newsService.setFile(file);
  newsService.updateContent(req.body.selected, req.body.content);
  res.set("Content-Type", "application/json");
  res.send(
    "Updated Content: " +
      JSON.stringify(newsService.getStory(req.body.selected))
  );
});

app.post("/deleteStory", function (req, res) {
  newsService.setFile(file);
  let deleted = newsService.getStory(req.body.selected);
  newsService.deleteStory(req.body.selected);
  res.set("Content-Type", "application/json");
  res.send("Story deleted: " + JSON.stringify(deleted));
});

app.post("/addStory", function (req, res) {
  newsService.setFile(file);
  newsService.addStory(
    req.body.title,
    req.body.author,
    req.body.public,
    req.body.content
  );
  res.set("Content-Type", "application/json");
  res.send("Story Added: " + JSON.stringify(req.body));
});
