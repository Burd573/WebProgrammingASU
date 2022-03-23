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
const setTitle = (input) => {
  story.TITLE = input;
};

// Set the author of the new story
const setAuthor = (input) => {
  story.AUTHOR = input;
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
const setPublic = (input) => {
  story.PUBLIC = input;
};

// Set the content of the new story
const setContent = (input) => {
  story.CONTENT = input;
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
  filterDataText.TITLE = title;
  filterDataText.AUTHOR = author;
};

// Set only title filter
const setTitleFilter = (title) => {
  filterDataText.TITLE = title;
};

// Set only author filter
const setAuthorFilter = (author) => {
  filterDataText.AUTHOR = author;
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

// Check if article is in range of dates provided by date filter
const inRange = (date, startRange, endRange) => {
  let storyDate = new Date(date);
  let StartDate = new Date(startRange);
  let endDate = new Date(endRange);

  return storyDate >= StartDate && storyDate <= endDate;
};

// Filter stories by date, takes in array of stories
const filterStoriesDate = (input) => {
  stories = input.filter(function (story) {
    if (
      !inRange(story.DATE, filterDataDate.startDate, filterDataDate.endDate)
    ) {
      return false;
    }
    return true;
  });
  return stories;
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
      //readline.close();
    }
  );
};
/************* Write Story Functions **************/
const storyName = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Story Name: ", (name) => {
      setTitle(name);
      resolve();
    });
  });
};

const storyAuthor = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Author Name: ", (name) => {
      setAuthor(name);
      resolve();
    });
  });
};

const storyFlag = () => {
  return new Promise((resolve, reject) => {
    readline.question("Set Public(T/F): ", (public) => {
      setPublic(public);
      resolve();
    });
  });
};

const storyContent = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter Story Content: ", (story) => {
      setContent(story);
      resolve();
    });
  });
};

const writeStory = async () => {
  await storyName();
  await storyAuthor();
  await storyFlag();
  await storyContent();
  setDate();
  newStory(story, "news1.json");
  loadData("news1.json");
  console.log("Story Added!");
  menu();
};

/************** Update Title Functions ***************/
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

const storyTitle = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter New Title: ", (title) => {
      updateHeadline("news1.json", data.selected, title);
      resolve();
    });
  });
};

const updateStoryTitle = async () => {
  await getStory();
  await storyTitle();
  loadData("news1.json");
  console.log("Title Changed!");
  menu();
};

/************** Update Content Functions ***************/

const newStoryContent = () => {
  return new Promise((resolve, reject) => {
    readline.question("Enter New Conent: ", (content) => {
      updateContent("news1.json", data.selected, content);
      resolve();
    });
  });
};

const updateStoryContent = async () => {
  await getStory();
  await newStoryContent();
  loadData("news1.json");
  console.log("content Changed!");
  menu();
};

loadData("news1.json");
menu();
