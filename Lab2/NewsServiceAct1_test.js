/*************** Testing ************************/
loadData("news1.json");

console.log("**********************************");
console.log("Current Stories");
for (var i in data.articles) {
  console.log(data.articles[i]);
}

console.log("**********************************");
console.log("Adding new Story");
setTitle("Suns Win!");
setAuthor("Chris Burdett");
setDate();
setContent("Suns are the champions!");
newStory(story, "news1.json");

console.log("**********************************");
console.log("Current Stories");
for (var i in data.articles) {
  console.log(data.articles[i]);
}

console.log("**********************************");
console.log("Updating Headline of last story: Newer Title");
updateHeadline("news1.json", data.articles.length - 1, "Newer Title");
console.log("Updating Content of last story: New Content");
updateContent("news1.json", data.articles.length - 1, "New Content");
console.log("**********************************");
console.log("Updated story");
console.log(data.articles[i]);

console.log("**********************************");
console.log("Deleting last story");
deleteStory("news1.json", data.articles.length - 1);
console.log("**********************************");
console.log("Current Stories");
for (var i in data.articles) {
  console.log(data.articles[i]);
}

console.log("**********************************");
console.log(
  "Filtering stories by Author: Igor, Title: Mulder, Date Range: 08-01-2018 - 09-02-2018"
);
setTitleFilter("Mulder");
setAuthorFilter("Igor");
setDateFilter("08-01-2018", "09-02-2018");
console.log(filter());
clearFilters();

console.log("**********************************");
console.log(
  "Filtering stories by Author: None, Title: None, Date Range: 08-01-2018 - 09-02-2018"
);
setDateFilter("08-01-2018", "09-02-2018");
console.log(filter());
clearFilters();

console.log("**********************************");
console.log("Filtering stories by Author: Igor, Title: None, Date Range: None");
setAuthorFilter("Igor");
//setDateFilter("08-01-2018", "09-02-2018");
console.log(filter());
clearFilters();
