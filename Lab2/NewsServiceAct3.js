const fs = require("fs");
const EventEmitter = require("events").EventEmitter;
const event = new EventEmitter();
const file = "news1.json";

/*************** Logging Functions **********************/
event.on("start", () => {
  setImmediate(() => {
    fs.appendFile("lab2logger.txt", "Program Started\n", (err) => {
      if (err) {
        console.log("Error Adding to logs");
      }
    });
  });
});

event.on("exit", () => {
  setImmediate(() => {
    fs.appendFile("lab2logger.txt", "Program Closed\n", (err) => {
      if (err) {
        console.log("Error Adding to logs");
      }
    });
  });
});

event.on("storyCreated", () => {
  setImmediate(() => {
    fs.appendFile(
      "lab2logger.txt",
      "Story Created. Written to: " + file + "\n",
      (err) => {
        if (err) {
          console.log("Error Adding to logs");
        }
      }
    );
  });
});

event.on("storyDeleted", () => {
  setImmediate(() => {
    fs.appendFile("lab2logger.txt", "Story Deleted\n", (err) => {
      if (err) {
        console.log("Error Adding to logs");
      }
    });
  });
});

const loadData = (input) => {
  return new Promise((resolve, reject) => {
    fs.readFile(input, (err, a) => {
      if (err) {
        console.log("error loading file");
      }
      data.contents = JSON.parse(a);
      data.articles = data.contents.NEWS.ARTICLE;
    });
    resolve();
  });
};

/**
 * Set and format the current date
 *
 * The filter end date will automatically get set to the current day. If the user
 * does not specify an end date but specifies a beginning date, the filter will bring up * all articles from the start date to the current date
 *
 * When an article is added to the json file, the current date it automatically inserted
 *
 * Returns the current date formatted as mm-dd-yyy
 */
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

/********************* Storage Objects **************************/

/**
 * News story object, can be modified to add new story
 *
 * The object holds all article data (title, author, date, public flag, and content)
 * When adding a new article to the file, the article data will be stored in this object
 * and the object as a whole will get pushed to the articles array in the file
 */
const story = {
  TITLE: "",
  AUTHOR: "",
  DATE: setDate(),
  PUBLIC: "",
  CONTENT: "",
};

/**
 * Object containing all data from file.
 *
 * When the file is read, all data will be stored in this object.
 * Contents is the whole NEWS JSON object
 * Articles is an array of all the articles from the NEWS JSON object
 * Selected is the index of an article (used when the user picks one specific
 * article to edit)
 */
const data = {
  contents: "data",
  articles: [],
  selected: "",
};

/**
 * Object containing text filters
 *
 * Author is set when the user enters a filter for the article author
 * Title is set when the user enters a filter for the article title
 *
 * These filters are used when the user wants to filter either the
 * article title or the author of the article.
 *
 * Will be combined with date range filter for complete filter
 */
const textFilter = {
  AUTHOR: "",
  TITLE: "",
};

/**
 * Object containing date range filters
 *
 * startDate is the start of the date range
 * endDate is the end of the date range - automatically set to the current
 * day in case the user does not enter an end date. This allows the user
 * to enter a start date but not an end date and get all articles from the
 * startDate to today
 *
 * These filters are used when the user wants to filter the articles by date
 *
 * Will be combined with text filter for complete filter
 */
const dateFilter = {
  startDate: "",
  endDate: setDate(),
};

/*************** Update Functions ************************/
// Writes a new news story to the file
const newStory = () => {
  data.articles.push(story);
  fs.writeFile(file, JSON.stringify(data.contents), (err) => {
    if (err) {
      console.log("Error Adding Story");
    }
    loadData(file);
  });
};

// Set the title of the new story
const setTitle = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Story Name: ", (name) => {
      story.TITLE = name;
      resolve();
    });
  });
};

// Set the author of the new story
const setAuthor = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Author Name: ", (author) => {
      story.AUTHOR = author;
      resolve();
    });
  });
};

// Set the public flag of the new story
const setPublic = () => {
  return new Promise((resolve, reject) => {
    readline.question("Set Public(T/F): ", (public) => {
      story.PUBLIC = public;
      resolve();
    });
  });
};

// Set the content of the new story
const setContent = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Story Content: ", (content) => {
      story.CONTENT = content;
      resolve();
    });
  });
};

// Updates news story headline
const updateHeadline = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter New Title: ", (title) => {
      data.articles[data.selected].TITLE = title;
      fs.writeFile(file, JSON.stringify(data.contents), (err) => {
        if (err) {
          console.log("Error Adding Story");
        }
        loadData(file);
      });
      resolve();
    });
  });
};

// Updates news story content
const updateContent = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter New Conent: ", (content) => {
      data.articles[data.selected].CONTENT = content;
      fs.writeFile(file, JSON.stringify(data.contents), (err) => {
        if (err) {
          console.log("Error Adding Story");
        }
        loadData(file);
      });
      resolve();
    });
  });
};

// Deletes a news story from the file
const deleteStory = () => {
  return new Promise((resolve, reject) => {
    data.articles.splice(data.selected, 1);
    fs.writeFile(file, JSON.stringify(data.contents), (err) => {
      if (err) {
        console.log("Error Adding Story");
      }
      loadData(file);
    });
    resolve();
  });
};

/*************** Filter Text Functions ************************/
// Sets the title and author filters
const setFilters = (title, author) => {
  textFilter.TITLE = title;
  textFilter.AUTHOR = author;
};

// Set only title filter
const setTitleFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Headline Filter: ", (headline) => {
      textFilter.TITLE = headline;
      resolve();
    });
  });
};

// Set only author filter
const setAuthorFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Author Filter: ", (author) => {
      textFilter.AUTHOR = author;
      resolve();
    });
  });
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

const setStartDateFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Start Date Filter: ", (date) => {
      dateFilter.startDate = date;
      resolve();
    });
  });
};

const setEndDateFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter End Date Filter: ", (date) => {
      dateFilter.endDate = date;
      resolve();
    });
  });
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

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = () => {
  readline.question(
    `Please choose from the following:
1. Write a new news story
2. Update a news story headline
3. Change the content of a news story
4. Delete a news story
5. Search for a new story
0. Quit
Choice: `,
    (input) => {
      if (input == 1) {
        writeStory();
      }
      if (input == 2) {
        updateStoryTitle();
      }
      if (input == 3) {
        updateStoryContent();
      }
      if (input == 4) {
        deleteNewsStory();
      }
      if (input == 5) {
        fitlerStories();
      }
      if (input == 0) {
        event.emit("exit");
        readline.close();
      }
      //readline.close();
    }
  );
};

const getStory = () => {
  for (var i in data.articles) {
    console.log(i + ": " + data.articles[i].TITLE);
  }
  return new Promise((resolve, reject) => {
    readline.question("Choose an article to update: ", (input) => {
      data.selected = input;
      resolve();
    });
  });
};
/************* Write Story Functions **************/

const writeStory = async () => {
  await setTitle();
  await setAuthor();
  await setPublic();
  await setContent();
  setDate();
  newStory();
  //   await loadData(file);
  event.emit("storyCreated");
  console.log("Story Created!");
  menu();
};

/************** Update Title Functions ***************/

const updateStoryTitle = async () => {
  await getStory();
  await updateHeadline();
  //   await loadData(file);
  console.log("Title Changed!");
  menu();
};

/************** Update Content Functions ***************/

const updateStoryContent = async () => {
  await getStory();
  await updateContent();
  //   await loadData(file);
  console.log("Content Changed!");
  menu();
};

/************** Delete Story Functions ***************/

const deleteNewsStory = async () => {
  await getStory();
  await deleteStory();
  event.emit("storyDeleted");
  console.log("Story Deleted!");
  menu();
};

const fitlerStories = async () => {
  await setTitleFilter();
  await setAuthorFilter();
  await setStartDateFilter();
  await setEndDateFilter();
  console.log("Filtered Stories:");
  console.log(filter());
  clearFilters();
  menu();
};

event.emit("start");
loadData(file);
menu();
