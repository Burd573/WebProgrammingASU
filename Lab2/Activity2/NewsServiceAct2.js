const fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const file = "news.json";

/**
 * Load the data from the file and store in the data object.
 *
 * The complete json object is stored in data.contents
 * The articles array is stored in data.articles
 *
 * The file is read asynchronously. After the file is read, the callback
 * function stores the data
 */
const loadData = () => {
  fs.readFile(file, (err, file) => {
    if (err) {
      console.log("error loading file");
    }
    data.contents = JSON.parse(file);
    data.articles = data.contents.NEWS.ARTICLE;
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

/**
 * Writes a new article to the file.
 *
 * Pushes the story object to the data object articles array and writes
 * the data.articles array to the file. After the file is written to,
 * the new data is loaded into the data object to keep the object current.
 */
const newStory = () => {
  data.articles.push(story);
  fs.writeFile(file, JSON.stringify(data.contents), (err) => {
    if (err) {
      console.log("Error Adding Story");
    }
    loadData();
  });
};

/**
 * List all stories in file and get input from user indicating which story to update
 * @returns promise
 */
const getStory = () => {
  for (var i in data.articles) {
    console.log(`${parseInt(i) + 1}: ` + data.articles[i].TITLE);
  }
  return new Promise((resolve, reject) => {
    readline.question("Choose an article to update: ", (input) => {
      data.selected = parseInt(input) - 1;
      if (data.selected > data.articles.length - 1) {
        reject();
      }
      resolve();
    });
  });
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

/*************** Setters for Objects ************************/
/**
 * These functions act as setters for setting the objects before altering the data.
 * They can be used in the API without needing the CLI
 */

const setTitle = (name) => {
  story.TITLE = name;
};

const setAuthor = (author) => {
  story.AUTHOR = author;
};

const setPublic = (public) => {
  story.PUBLIC = public;
};

const setContent = (content) => {
  story.CONTENT = content;
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

// Clear all filters
const clearFilters = () => {
  textFilter.TITLE = "";
  textFilter.AUTHOR = "";
  dateFilter.startDate = "";
  dateFilter.endDate = setDate();
};

/***************** Update Functions ********************/
/**
 * These functions update the file based on the data objects. They take in
 * parameters and use the input to update the objects before writing to the
 * file. They can be used in the API without the CLI
 */

// Updates news story headline
const updateHeadline = (title) => {
  return new Promise((resolve, reject) => {
    data.articles[data.selected].TITLE = title;
    fs.writeFile(file, JSON.stringify(data.contents), (err) => {
      if (err) {
        console.log("Error Writing New Headline to File");
        reject();
      }
      loadData();
    });
    resolve();
  });
};

// Updates news story content
const updateContent = (content) => {
  return new Promise((resolve, reject) => {
    data.articles[data.selected].CONTENT = content;
    fs.writeFile(file, JSON.stringify(data.contents), (err) => {
      if (err) {
        console.log("Error Writing New Content to File");
      }
      loadData();
    });
    resolve();
  });
};

// Deletes a news story from the file
const deleteStory = () => {
  return new Promise((resolve, reject) => {
    data.articles.splice(data.selected, 1);
    fs.writeFile(file, JSON.stringify(data.contents), (err) => {
      if (err) {
        console.log("Error Updating file after delete");
      }
      loadData();
    });
    resolve();
  });
};

/********************** Filter Functions *****************************/
/**
 * These functions implement the filter functionality. Sets the filter objects
 * and filters the data based on those objects
 */

// Filter all stories by title and author, returns filtered array of stories
const filterStoriesText = () => {
  stories = data.articles.filter(function (story) {
    for (var key in textFilter) {
      if (!story[key].toLowerCase().includes(textFilter[key].toLowerCase())) {
        return false;
      }
    }
    return true;
  });
  return stories;
};

// Check if article is in range of dates provided by date filter
const inRange = (date, startRange, endRange) => {
  let storyDate = new Date(date);
  let StartDate = new Date(startRange);
  let endDate = new Date(endRange);

  return storyDate >= StartDate && storyDate <= endDate;
};

/**
 * Takes in an array of articles. Meant to be partially sorted from text filter
 * but does not have to be. Filters the input array based on the date range filters
 *
 * @param {array} input Partially sorted array
 * @returns fully sorted array
 */
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

/**
 * Complete Filter function. Filters based on text values first (title and author)
 * and then passes the partly filtered array through the date range filter
 * for a fully filtered array based on all critera
 *
 * @returns filtered array of articles
 */
const filter = () => {
  var ret = filterStoriesText();
  return filterStoriesDate(ret);
};

/************************ User Input Setters ************************/
/**
 * These functions are used when the user is using the CLI. Due to the nature
 * of the CLI and readline, these functions return a promise, allowing the code
 * to be run asynchronously.
 *
 * Each function takes in input from the user via the CLI and uses the appropriate
 * setter method to set the data objects based on the user input. They essentially do
 * the same thing as the above setter methods but through readline and the CLI and
 * can be ran asynchronously
 */
const userSetTitle = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Story Name: ", (name) => {
      setTitle(name);
      resolve();
    });
  });
};

const userSetAuthor = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Author Name: ", (author) => {
      setAuthor(author);
      resolve();
    });
  });
};

const userSetPublic = () => {
  return new Promise((resolve, reject) => {
    readline.question("Set Public(T/F): ", (public) => {
      setPublic(public);
      resolve();
    });
  });
};

const userSetContent = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Story Content: ", (content) => {
      setContent(content);
      resolve();
    });
  });
};

const userSetTitleFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Headline Filter: ", (headline) => {
      setTitleFilter(headline);
      resolve();
    });
  });
};

const userSetAuthorFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Author Filter: ", (author) => {
      setAuthorFilter(author);
      resolve();
    });
  });
};

const userSetStartDateFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Start Date Filter: ", (startDate) => {
      setStartDateFilter(startDate);
      resolve();
    });
  });
};

const userSetEndDateFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter End Date Filter: ", (endDate) => {
      setEndDateFilter(endDate);
      resolve();
    });
  });
};

/*************** User Input Update Functions ********************/
/**
 * These functions update the file based on user input from the CLI.
 */

const userUpdateHeadline = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter New Title: ", async (title) => {
      await updateHeadline(title);
      resolve();
    });
  });
};

// Updates news story content
const userUpdateContent = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter New Conent: ", async (content) => {
      await updateContent(content);
      resolve();
    });
  });
};

/****************** Menu Functions *********************/
/**
 * These functions are called by the menu input to fully implement the
 * CLI functionality. They are async functions that wait for user input
 * before moving to the next prompt.
 */
const writeStory = async () => {
  await userSetTitle();
  await userSetAuthor();
  await userSetPublic();
  await userSetContent();
  setDate();
  newStory();
  console.log("Story Created!\n");
  menu();
};

const updateStoryTitle = async () => {
  try {
    await getStory();
  } catch (err) {
    console.log("Invalid selection. Reverting to main menu");
    menu();
  }
  await userUpdateHeadline();
  console.log("Title Changed!\n");
  menu();
};

const updateStoryContent = async () => {
  try {
    await getStory();
  } catch (err) {
    console.log("Invalid selection. Reverting to main menu");
    menu();
  }
  await userUpdateContent();
  console.log("Content Changed!\n");
  menu();
};

const deleteNewsStory = async () => {
  try {
    await getStory();
  } catch (err) {
    console.log("Invalid selection. Reverting to main menu");
    menu();
  }
  await deleteStory();
  console.log("Story Deleted!\n");
  menu();
};

const fitlerStories = async () => {
  await userSetTitleFilter();
  await userSetAuthorFilter();
  await userSetStartDateFilter();
  await userSetEndDateFilter();
  console.log("Filtered Stories:");
  console.log(filter());
  clearFilters();
  console.log();
  menu();
};

/**
 * Main Menu takes input from user and handles next step based
 * on that input.
 */
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
    async (input) => {
      switch (input) {
        case "1":
          writeStory();
          break;
        case "2":
          updateStoryTitle();
          break;
        case "3":
          updateStoryContent();
          break;
        case "4":
          deleteNewsStory();
          break;
        case "5":
          fitlerStories();
          break;
        case "0":
          readline.close();
          break;
        default:
          console.log("Invalid Selection. Please Enter 0-5:");
          menu();
      }
    }
  );
};

loadData();
menu();
