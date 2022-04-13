import { readFileSync, writeFileSync } from "fs";

// Set the date of the new story to the current day and format date
const setDate = () => {
  var date = new Date();
  var year = date.getFullYear();

  var month = (date.getMonth() + 1).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  let ret = month + "-" + day + "-" + year;
  return ret;
};

var dataFile = "";

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
export const loadData = () => {
  data.contents = JSON.parse(readFileSync(dataFile));
  data.articles = data.contents.NEWS.ARTICLE;
};

/*************** Update Functions ************************/
// Writes a new news story to the file
export const newStory = (input, output) => {
  const newData = data.articles.push(input);
  writeFileSync(output, JSON.stringify(data.contents));
};

export const addStory = (title, author, publicFlag, content) => {
  loadData();
  setTitle(title);
  setAuthor(author);
  setPublic(publicFlag);
  setContent(content);
  data.contents.NEWS.ARTICLE.push(story);

  writeFileSync(dataFile, JSON.stringify(data.contents));
};

export const getStory = (selected) => {
  loadData();
  return data.articles[selected];
};

export const setFile = (input) => {
  dataFile = input;
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
export const updateHeadline = (index, newHeadline) => {
  loadData();
  data.articles[index].TITLE = newHeadline;
  writeFileSync(dataFile, JSON.stringify(data.contents));
};

// Updates news story content
export const updateContent = (index, newContent) => {
  loadData();
  data.articles[index].CONTENT = newContent;
  writeFileSync(dataFile, JSON.stringify(data.contents));
};

// Deletes a news story from the file
export const deleteStory = (index) => {
  loadData();
  data.articles.splice(index);
  writeFileSync(dataFile, JSON.stringify(data.contents));
};

/*************** Filter Text Functions ************************/
// Sets the title and author filters
export const setFilters = (title, author) => {
  if (title != undefined) {
    textFilter.TITLE = title;
  }
  if (author != undefined) {
    textFilter.AUTHOR = author;
  }
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
export const filterStoriesText = () => {
  loadData();
  let stories = data.articles.filter(function (story) {
    for (var key in textFilter) {
      if (!story[key].toLowerCase().includes(textFilter[key].toLowerCase())) {
        return false;
      }
    }
    return true;
  });
  return stories;
};

/*************** Filter Date Functions ************************/
// Set the date filter range
export const setDateFilter = (startDate, endDate) => {
  if (startDate != undefined) {
    dateFilter.startDate = startDate;
  }
  if (endDate != undefined) {
    dateFilter.endDate = endDate;
  }
};

// Check if article is in range of dates provided by date filter
const inRange = (date, startRange, endRange) => {
  let storyDate = new Date(date);
  let StartDate = new Date(startRange);
  let endDate = new Date(endRange);

  return storyDate >= StartDate && storyDate <= endDate;
};

// Filter stories by date, takes in array of stories
export const filterStoriesDate = (input) => {
  loadData();
  if (dateFilter.startDate !== "" && dateFilter.endDate !== "") {
    let stories = input.filter(function (story) {
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
export const filter = () => {
  var ret = filterStoriesText();
  return filterStoriesDate(ret);
};

// Clear all filters
export const clearFilters = () => {
  textFilter.TITLE = "";
  textFilter.AUTHOR = "";
  dateFilter.startDate = "";
  dateFilter.endDate = setDate();
};

export const getAllStories = () => {
  loadData();
  return data.articles;
};

export const getAvailableStories = (role, userName) => {
  loadData();
  if (role == "guest") {
    let stories = data.articles.filter(function (story) {
      return story.PUBLIC == "T";
    });
    return stories;
  }
  if (role == "Subscriber") {
    return data.articles;
  }
  if (role == "Reporter") {
    let stories = data.articles.filter(function (story) {
      if (story.AUTHOR.toLowerCase() == userName.toLowerCase()) {
        return true;
      }
      if (story.PUBLIC == "T") {
        return true;
      }
      return false;
    });
    return stories;
  }
};

export const getReporterStories = (role, userName) => {
  loadData();

  if (role == "Reporter") {
    let stories = data.articles.filter(function (story) {
      return story.AUTHOR.toLowerCase() == userName.toLowerCase();
    });
    return stories;
  }
};

export const getStoriesFiltered = (
  role,
  title,
  author,
  startDate,
  endDate,
  userName
) => {
  loadData();
  setFilters(title, author);
  setDateFilter(startDate, endDate);
  let filtered = filter();
  if (role == "guest") {
    let stories = filtered.filter(function (story) {
      return story.PUBLIC == "T";
    });
    return stories;
  }

  if (role == "Subscriber") {
    return filtered;
  }

  if (role == "Reporter") {
    let stories = filtered.filter(function (story) {
      if (story.AUTHOR.toLowerCase() == userName.toLowerCase()) {
        return true;
      }
      if (story.PUBLIC == "T") {
        return true;
      }
      return false;
    });
    return stories;
  }
};

export const compareStories = (story1, story2) => {
  const keys1 = Object.keys(story1);
  const keys2 = Object.keys(story2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (story1[key] !== story2[key]) {
      return false;
    }
  }
  return true;
};

export const getIndex = (title) => {
  loadData();
  for (var i in data.articles) {
    if (data.articles[i].TITLE == title) {
      return i;
    }
  }
  return "error";
};
