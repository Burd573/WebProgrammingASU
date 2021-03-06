const fs = require("fs");

// Set the date of the new story to the current day and format date
const setDate = () => {
  var date = new Date();
  var year = date.getFullYear();

  var month = (date.getMonth() + 1).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  ret = month + "-" + day + "-" + year;
  return ret;
};

// News story object, can be modified to add new story
const story = {
  TITLE: "",
  AUTHOR: "",
  DATE: setDate(),
  PUBLIC: "",
  CONTENT: "",
};

// Data retrieved from file, contains all news stories stored in file
const data = {
  contents: "data",
  articles: [],
  selected: "",
};

// Filters author and title from news stories
const textFilter = {
  AUTHOR: "",
  TITLE: "",
};

// sets date range to filter from news stories
const dateFilter = {
  startDate: "",
  endDate: setDate(),
};

// Loads news stories data from file
const loadData = (input) => {
  data.contents = JSON.parse(fs.readFileSync(input));
  data.articles = data.contents.NEWS.ARTICLE;
};

/*************** Update Functions ************************/
// Writes a new news story to the file
const newStory = (input, output) => {
  const newData = data.articles.push(input);
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

// Set the title of the new story
const setTitle = (input) => {
  story.TITLE = input;
};

// Set the author of the new story
const setAuthor = (input) => {
  story.AUTHOR = input;
};

// Set the public flag of the new story
const setPublic = (input) => {
  story.PUBLIC = input;
};

// Set the content of the new story
const setContent = (input) => {
  story.CONTENT = input;
};

const setAuthorFilter = (authorFilter) => {
  textFilter.AUTHOR = authorFilter;
};

const setTitleFilter = (titleFilter) => {
  textFilter.TITLE = titleFilter;
};

const setStartDateFilter = (startDateFilter) => {
  dateFilter.startDate = startDateFilter;
};

const setEndDateFilter = (endDateFilter) => {
  dateFilter.endDate = endDateFilter;
};

// Updates news story headline
const updateHeadline = (output, index, newHeadline) => {
  data.articles[index].TITLE = newHeadline;
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

// Updates news story content
const updateContent = (output, index, newContent) => {
  data.articles[index].CONTENT = newContent;
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

// Deletes a news story from the file
const deleteStory = (output, index) => {
  data.articles.splice(index);
  fs.writeFileSync(output, JSON.stringify(data.contents));
};

/*************** Filter Text Functions ************************/
// Sets the title and author filters
const setFilters = (title, author) => {
  textFilter.TITLE = title;
  dateFilter.AUTHOR = author;
};

// Clear only title filter
const clearTitleFilter = () => {
  textFilter.TITLE = "";
};

// clear only author filter
const clearAuthorFilter = () => {
  textFilter.AUTHOR = "";
};

// Filter all stories by title and author, returns filtered array of stories
const filterStoriesText = () => {
  stories = data.articles.filter(function (story) {
    for (var key in textFilter) {
      if (!story[key].includes(textFilter[key])) {
        return false;
      }
    }
    return true;
  });
  return stories;
};

/*************** Filter Date Functions ************************/
// Set the date filter range
const setDateFilter = (startDate, endDate) => {
  dateFilter.startDate = startDate;
  dateFilter.endDate = endDate;
};

// Check if article is in range of dates provided by date filter
const inRange = (date, startRange, endRange) => {
  let storyDate = new Date(date);
  let StartDate = new Date(startRange);
  let endDate = new Date(endRange);

  return storyDate >= StartDate && storyDate <= endDate;
};

// Filter stories by date, takes in array of stories
const filterStoriesDate = (input) => {
  if (dateFilter.startDate !== "" && dateFilter.endDate !== "") {
    stories = input.filter(function (story) {
      if (!inRange(story.DATE, dateFilter.startDate, dateFilter.endDate)) {
        return false;
      }
      return true;
    });
    return stories;
  } else {
    return input;
  }
};

// filter stories on all criteria (author, title, date range)
const filter = () => {
  var ret = filterStoriesText();
  return filterStoriesDate(ret);
};

// Clear all filters
const clearFilters = () => {
  textFilter.TITLE = "";
  textFilter.AUTHOR = "";
  dateFilter.startDate = "";
  dateFilter.endDate = setDate();
};
