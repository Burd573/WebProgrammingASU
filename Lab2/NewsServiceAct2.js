const fs = require("fs");

// News story object, can be modified to add new story
const story = {
  TITLE: "",
  AUTHOR: "",
  DATE: "",
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
const filterDataText = {
  AUTHOR: "",
  TITLE: "",
};

// sets date range to filter from news stories
const filterDataDate = {
  startDate: "",
  endDate: "",
};

// Loads news stories data from file
const loadData = (input) => {
  fs.readFile(input, (err, a) => {
    data.contents = JSON.parse(a);
    data.articles = data.contents.NEWS.ARTICLE;
  });
};

// const loadData = (input) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(input, (err, a) => {
//       data.contents = JSON.parse(a);
//       data.articles = data.contents.NEWS.ARTICLE;
//     });
//     resolve();
//   });
// };

/*************** Update Functions ************************/
// Writes a new news story to the file
const newStory = (input, output) => {
  const newData = data.articles.push(input);
  fs.writeFileSync(output, JSON.stringify(data.contents));
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

// Set the date of the new story to the current day and format date
const setDate = () => {
  var date = new Date();
  var year = date.getFullYear();

  var month = (date.getMonth() + 1).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  story.DATE = month + "-" + day + "-" + year;
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
      fs.writeFileSync("news1.json", JSON.stringify(data.contents));
      resolve();
    });
  });
};

// Updates news story content
const updateContent = (output, index, newContent) => {
  return new Promise((resolve, reject) => {
    readline.question("Enter New Conent: ", (content) => {
      data.articles[data.selected].CONTENT = content;
      fs.writeFileSync("news1.json", JSON.stringify(data.contents));
      resolve();
    });
  });
};

// Deletes a news story from the file
const deleteStory = () => {
  data.articles.splice(data.selected, 1);
  fs.writeFileSync("news1.json", JSON.stringify(data.contents));
};

/*************** Filter Text Functions ************************/
// Sets the title and author filters
const setFilters = (title, author) => {
  filterDataText.TITLE = title;
  filterDataText.AUTHOR = author;
};

// Set only title filter
const setTitleFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Headline Filter: ", (headline) => {
      filterDataText.TITLE = headline;
      resolve();
    });
  });
};

// Set only author filter
const setAuthorFilter = (author) => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Author Filter: ", (author) => {
      filterDataText.AUTHOR = author;
      resolve();
    });
  });
};

// Clear only title filter
const clearTitleFilter = () => {
  filterDataText.TITLE = "";
};

// clear only author filter
const clearAuthorFilter = () => {
  filterDataText.AUTHOR = "";
};

// Filter all stories by title and author, returns filtered array of stories
const filterStoriesText = () => {
  stories = data.articles.filter(function (story) {
    for (var key in filterDataText) {
      if (!story[key].includes(filterDataText[key])) {
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
  filterDataDate.startDate = startDate;
  filterDataDate.endDate = endDate;
};

const setStartDateFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Start Date Filter: ", (date) => {
      filterDataDate.startDate = date;
      resolve();
    });
  });
};

const setEndDateFilter = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter End Date Filter: ", (date) => {
      filterDataDate.endDate = date;
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
  if (filterDataDate.startDate !== "" && filterDataDate.endDate !== "") {
    stories = input.filter(function (story) {
      if (
        !inRange(story.DATE, filterDataDate.startDate, filterDataDate.endDate)
      ) {
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
  filterDataText.TITLE = "";
  filterDataText.AUTHOR = "";
  filterDataDate.startDate = "";
  filterDataDate.endDate = "";
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
  newStory(story, "news1.json");
  loadData("news1.json");
  console.log("Story Added!");
  menu();
};

/************** Update Title Functions ***************/

const updateStoryTitle = async () => {
  await getStory();
  await updateHeadline();
  loadData("news1.json");
  console.log("Title Changed!");
  menu();
};

/************** Update Content Functions ***************/

const updateStoryContent = async () => {
  await getStory();
  await updateContent();
  loadData("news1.json");
  console.log("content Changed!");
  menu();
};

/************** Delete Story Functions ***************/

const deleteNewsStory = async () => {
  await getStory();
  deleteStory();
  loadData("news1.json");
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
  menu();
};

loadData("news1.json");
menu();
