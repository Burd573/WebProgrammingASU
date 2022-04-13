import * as newsService from "../NewsService.js";
import express from "express";
import session from "express-session";

var app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "MAGICALEXPRESSKEY",
    resave: true,
    saveUninitialized: true,
  })
);
app.listen(3003);

const file = "newsStories/news.json";

app.get("/", function (req, res) {
  if (!req.session.userName) {
    req.session.userName = "guest";
    req.session.role = "guest";
  }
  newsService.setFile(file);
  let allStories = newsService.getAllStories();
  let availableStories = newsService.getAvailableStories(
    req.session.role,
    req.session.userName
  );

  let accessableStories = allStories.filter(function (story) {
    return availableStories.some(function (aStory) {
      return newsService.compareStories(story, aStory);
    });
  });

  let lockedStories = allStories.filter(function (story) {
    return !availableStories.some(function (aStory) {
      return newsService.compareStories(story, aStory);
    });
  });

  res.render("index", {
    user: req.session,
    accessableStories: accessableStories,
    lockedStories: lockedStories,
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/logout", function (req, res) {
  req.session.userName = "guest";
  req.session.role = "guest";

  newsService.setFile(file);
  let allStories = newsService.getAllStories();
  let availableStories = newsService.getAvailableStories(
    req.session.role,
    req.session.userName
  );

  let accessableStories = allStories.filter(function (story) {
    return availableStories.some(function (aStory) {
      return newsService.compareStories(story, aStory);
    });
  });

  let lockedStories = allStories.filter(function (story) {
    return !availableStories.some(function (aStory) {
      return newsService.compareStories(story, aStory);
    });
  });

  res.render("index", {
    user: req.session,
    accessableStories: accessableStories,
    lockedStories: lockedStories,
  });
});

app.get("/stories", function (req, res) {
  res.render("story", { params: req.query, user: req.session });
});

app.post("/userConfirmation", function (req, res) {
  if (req.body.userName == req.body.password) {
    req.session.userName = req.body.userName;
    req.session.role = req.body.role;
  }
  res.render("userConfirmation", { user: req.session });
});

app.get("/stories/:author?/:title?/:startDate?/:endDate?", function (req, res) {
  newsService.setFile(file);
  let filtered = newsService.getStoriesFiltered(
    req.session.role,
    req.query.title,
    req.query.author,
    req.query.startDate,
    req.query.endDate,
    req.session.userName
  );
  newsService.clearFilters();
  res.render("stories", { data: filtered, user: req.session });
});

app.get("/editStories", function (req, res) {
  res.render("editStories");
});

app.get("/addStory", function (req, res) {
  res.render("addStory", { user: req.session });
});

app.get("/select/:headline?/:content?/:delete?", function (req, res) {
  newsService.setFile(file);
  let stories = newsService.getReporterStories(
    req.session.role,
    req.session.userName
  );
  res.render("select", { data: stories, type: req.query, user: req.session });
});

app.post("/updateHeadline", function (req, res) {
  newsService.setFile(file);
  let index = newsService.getIndex(req.body.selected);

  try {
    newsService.updateHeadline(index, req.body.headline);
    res.render("updated", { op: "headline" });
  } catch (err) {
    res.render("error");
  }
});

app.post("/updateContent", function (req, res) {
  newsService.setFile(file);
  let index = newsService.getIndex(req.body.selected);
  try {
    newsService.updateContent(index, req.body.content);
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
