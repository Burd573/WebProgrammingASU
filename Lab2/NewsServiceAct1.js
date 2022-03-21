const fs = require("fs");

const story = {
  TITLE: "Title",
  AUTHOR: "author",
  DATE: "date",
  PUBLIC: "f",
  CONTENT: "content",
};

const data = {
  contents: "data",
  articles: [],
};

const filterData = {
  AUTHOR: "",
  TITLE: "",
  DATE: "",
};

const newStory = (input, output) => {
  const newData = data.articles.push(input);
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

const loadData = (input) => {
  data.contents = JSON.parse(fs.readFileSync(input));
  data.articles = data.contents.NEWS.ARTICLE;
};

const updateHeadline = (output, index, newHeadline) => {
  data.articles[index].TITLE = newHeadline;
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

const updateContent = (output, index, newContent) => {
  data.articles[index].CONTENT = newContent;
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

const deleteStory = (output, index) => {
  data.articles.splice(index);
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

const setFilter = (title, author, date) => {
  filterData.TITLE = title;
  filterData.AUTHOR = author;
  filterData.DATE = date;
};

const clearFilters = () => {
  filterData.TITLE = "";
  filterData.AUTHOR = "";
  filterData.DATE = "";
};

const filterStories = () => {
  stories = data.articles.filter(function (story) {
    for (var key in filterData) {
      if (!story[key].includes(filterData[key])) {
        return false;
      }
    }
    return true;
  });
  console.log(stories);
};

loadData("news1.json");
//newStory(story, "news1.json");
//updateHeadline("news1.json", data.articles.length - 1, "Newer Title");
//updateContent("news1.json", data.articles.length - 1, "New Content");
//deleteStory("news1.json", data.articles.length - 1);
setFilter("Newer", "author", "date");
clearFilters();
setFilter("", "Igor", "");
filterStories();
