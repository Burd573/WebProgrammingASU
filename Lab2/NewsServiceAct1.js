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

const filterDataText = {
  AUTHOR: "",
  TITLE: "",
};

const filterDataDate = {
  startDate: "",
  endDate: "",
};

const loadData = (input) => {
  data.contents = JSON.parse(fs.readFileSync(input));
  data.articles = data.contents.NEWS.ARTICLE;
};

/*************** Update Functions ************************/
const newStory = (input, output) => {
  const newData = data.articles.push(input);
  fs.writeFileSync(output, JSON.stringify(data.contents));
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

/*************** Filter Text Functions ************************/

const setFilters = (title, author) => {
  filterDataText.TITLE = title;
  filterDataText.AUTHOR = author;
};

const clearFilters = () => {
  filterDataText.TITLE = "";
  filterDataText.AUTHOR = "";
};

const setTitleFilter = (title) => {
  filterDataText.TITLE = title;
};

const setAuthorFilter = (author) => {
  filterDataText.AUTHOR = author;
};

const clearTitleFilter = () => {
  filterDataText.TITLE = "";
};

const clearAuthorFilter = () => {
  filterDataText.AUTHOR = "";
};

const filterStoriesText = () => {
  stories = data.articles.filter(function (story) {
    for (var key in filterDataText) {
      if (!story[key].includes(filterDataText[key])) {
        return false;
      }
    }
    return true;
  });
  console.log(stories);
};

/*************** Filter Date Functions ************************/
const setDateFilter = (startDate, endDate) => {
  filterDataDate.startDate = startDate;
  filterDataDate.endDate = endDate;
};

const isDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const inRange = (date, startRange, endRange) => {
  let storyDate = new Date(date);
  let StartDate = new Date(startRange);
  let endDate = new Date(endRange);

  return storyDate >= StartDate && storyDate <= endDate;
};

const filterStoriesDate = () => {
  stories = data.articles.filter(function (story) {
    if (
      !inRange(story.DATE, filterDataDate.startDate, filterDataDate.endDate)
    ) {
      return false;
    }
    return true;
  });
  console.log(stories);
};

/*************** Testing ************************/
loadData("news1.json");
//newStory(story, "news1.json");
//updateHeadline("news1.json", data.articles.length - 1, "Newer Title");
//updateContent("news1.json", data.articles.length - 1, "New Content");
//deleteStory("news1.json", data.articles.length - 1);

// setFilters("", "Igor");
// setAuthorFilter("Igor");
// filterStoriesText();
// clearFilters();

setDateFilter("08-01-2018", "09-02-2018");
// console.log(filterDataDate.startDate);
// console.log(filterDataDate.endDate);

// console.log(
//   inRange("09-01-2018", filterDataDate.startDate, filterDataDate.endDate)
// );

filterStoriesDate();

// console.log(inRange(data.articles[0].DATE, "08/10/2018"));
// console.log(filterData.startDate);
