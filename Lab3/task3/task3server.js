const fs = require("fs");
const http = require("http");
const url = require("url").URL;

const ROOT_DIR = "task3/";
const file = "grocerydata/groceries.json";
var msg = "test";

const item = {
  name: "",
  brand: "",
  quantity: "",
  aisle: "",
  custom: "",
};

const data = {
  contents: [],
};

/**
 * Load Data from file. If the file does not exist, create it. If it does exist
 * store the data in the data object.
 */
const loadData = () => {
  let exists = fs.existsSync(file);
  if (exists) {
    data.contents = JSON.parse(fs.readFileSync(file));
  } else {
    fs.openSync(file, "w");
  }
};

/**
 * Write a new item to groceries.json
 */
const writeData = () => {
  loadData();
  data.contents.push(item);
  fs.writeFileSync(file, JSON.stringify(data.contents));
};

http
  .createServer((req, res) => {
    let urlObj = new URL(req.url, "http://localhost:3000");
    let qstr = urlObj.searchParams;

    if (req.method == "GET") {
      /**
       * Load the form from index.html when url is at homepage to make sure
       * data object is up to date
       */
      if (urlObj.pathname == "/") {
        fs.readFile(ROOT_DIR + "index.html", (err, data) => {
          if (err) {
            writeHeader(res, 404, "text/html");
            res.end("404 Not Found: " + JSON.stringify(err));
            return;
          }
          writeHeader(res, 200, "text/html");
          res.end(data);
        });
      } else if (urlObj.pathname == "/my_groceries") {
        /**
         * Check to see if the value entered for aisle is a number.
         * If it is not, send response back to the client instructing the
         * user to enter a valid number
         */
        if (isNaN(qstr.get("aisle"))) {
          if (req.headers.accept == "application/json") {
            writeHeader(res, 400, "application/json");
            res.end(JSON.stringify("Please enter a number for aisle"));
            return;
          }
          if (req.headers.accept == "text/plain") {
            writeHeader(res, 400, "text/plain");
            res.end("Please enter a number for aisle");
            return;
          }
          writeHeader(res, 400, "text/html");
          res.end(sendRes(`Please enter a number for aisle `));
          return;
        }
        /**
         * Check to see if the value entered for diet is a string.
         * If it is not, send response back to the client instructing the
         * user to enter a valid string
         */
        if (qstr.get("custom") != "" && !isNaN(qstr.get("custom"))) {
          if (req.headers.accept == "application/json") {
            writeHeader(res, 400, "application/json");
            res.end(JSON.stringify("Please enter a string for diet"));
            return;
          }
          if (req.headers.accept == "text/plain") {
            writeHeader(res, 400, "text/plain");
            res.end("Please enter a string for diet");
            return;
          }
          writeHeader(res, 400, "text/html");
          res.end(sendRes("Please enter a string for diet"));
          return;
        }
        /**
         * If the request is a GET request, the path is my_grocieries, and
         * favorites is on in the get request, check the cookies on the browser.
         * If there are favorites stored in the browser, set them in the favorites
         * array and filter the aisle and brand out of the favorites array rather
         * than the entire json file
         */
        if (qstr.get("favorites") == "on") {
          var cookies = parseCookies(req);
          var favorites = getItemsFromCookies(cookies);

          let filteredItems = getFavoriteItems(
            qstr.get("aisle"),
            qstr.get("custom"),
            favorites
          );
          let rows = my_favsToTableRows(filteredItems);
          writeHeader(res, 200, "text/html");
          res.end(my_favsTable(msg, rows));
          return;
        }

        /**
         * Filter the items of the entire json file by the aisle and brand
         * and store in filteredItems
         */
        let filteredItems = getItems(qstr.get("aisle"), qstr.get("custom"));

        /**
         * If the accept language is set to text/plain, return the data in the
         * required format
         */
        if (req.headers.accept == "text/plain") {
          writeHeader(res, 406, "text/plain");
          res.end(plainText(filteredItems));
          return;
        }

        /**
         * If the accept language is set to application/json, return the data in
         * the required format
         */
        if (req.headers.accept == "application/json") {
          writeHeader(res, 200, "application/json");
          res.end(
            JSON.stringify(getItems(qstr.get("aisle"), qstr.get("custom")))
          );
          return;
        }
        /**
         * If the accept language is set to application/xml, return a 406
         * error with a message explaining the acceptable accept languages
         */
        if (req.headers.accept == "application/xml") {
          writeHeader(res, 406, "text/html");
          res.end(
            `<html><head><title>Grocery List</title></head><body>
            <span>This application accepts text/html text/plain or application/json</span></body></html>`
          );
          return;
        }
        /**
         * If the request is a GET request, the path is my_groceries, the
         * favorites is not selected, and the accept language is not specified
         * in the request, filter the aisle and brand name from the entire
         * contents in the json file, and set the responce language to
         * text/html
         */
        let rows = my_groceriesToTableRows(filteredItems);
        writeHeader(res, 200, "text/html");
        res.end(my_grocieriesTable(msg, rows));
      } else if (urlObj.pathname == "/favorites") {
        /**
         * Not specified but if the user wants to go to the favorites page to
         * view all favorites by typing in the url, they can see all of
         * the favorite items
         */
        var cookies = parseCookies(req);
        var favorites = getItemsFromCookies(cookies);

        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        let rows = my_favsToTableRows(favorites);
        res.end(my_favsTable("Favorites", rows));
        return;
      } else {
        /**
         * Any other request will result in a 404: not found error
         */
        writeHeader(res, 404, "text/html");
        res.end("404 Not Found");
      }
    }

    if (req.method == "POST") {
      var itemData = "";
      req.on("data", (chunk) => {
        itemData += chunk;
      });

      /**
       * If the request is a POST request and the path is favorites, get
       * the payload data and look to see if there are currently any
       * favorite cookies active already. If there are, add those favorites to
       * the favorite array. Then look at the payload to see if any more
       * favorites are being set. If they are, add those to the favorites array.
       * Take the favorites array and update the cookies based on the new
       * favorites added
       */
      if (urlObj.pathname == "/favorites") {
        req.on("end", () => {
          let ret = new Array();
          var date = new Date();
          date.setTime(date.getTime() + 5 * 60 * 1000);
          let params = new URLSearchParams(itemData);

          var cookies = parseCookies(req);
          var favorites = getItemsFromCookies(cookies);
          addFavorites(params, favorites);

          for (let i in favorites) {
            ret.push(
              `fav${i}=${favorites[i].name},${
                favorites[i].brand
              }; Expires=${date.toGMTString()};`
            );
          }

          res.writeHead(200, {
            "Set-Cookie": ret,
            "Content-Type": "text/html",
          });
          let rows = my_favsToTableRows(favorites);
          res.end(my_favsTable("Favorites", rows));
        });
        return;
      }
      /**
       * If the request is a POST request, take the data from the payload and
       * add it to the item object. Do some error handling on the data and if
       * everything looks OK, write that item to the json file and send
       * appropriate response back to the client
       */
      req.on("end", () => {
        let params = new URLSearchParams(itemData);
        item.name = params.get("name");
        item.brand = params.get("brand");
        item.quantity = params.get("quantity");
        item.aisle = params.get("aisle");
        item.custom = params.get("custom");
        /**
         * Check to make sure each item is not blank. If it is, send a response
         * back to the client explaining why the item was not added
         */
        for (var i in item) {
          if (item[i] == "") {
            res.writeHead(400, {
              "Content-Type": "text/html",
            });
            res.end(sendRes(`Please enter value for ${i} `));
            return;
          }
        }
        /**
         * Check to see if the value entered for quantity is a number.
         * If it is not, send response back to the client instructing the
         * user to enter a valid number
         */
        if (isNaN(params.get("quantity"))) {
          res.writeHead(400, {
            "Content-Type": "text/html",
          });
          res.end(sendRes(`Please enter a number for quantity `));
          return;
        }
        /**
         * Check to see if the value entered for aisle is a number.
         * If it is not, send response back to the client instructing the
         * user to enter a valid number
         */
        if (isNaN(params.get("aisle"))) {
          res.writeHead(400, {
            "Content-Type": "text/html",
          });
          res.end(sendRes(`Please enter a number for aisle `));
          return;
        }
        // Write the data to the json file
        writeData();
        // After item is written to client, send apprpriate response to the client
        res.writeHead(201, {
          "Content-Type": "text/html",
        });
        res.end(
          sendRes(
            `${item.name} Added! <br> Total Items in list: ${data.contents.length}`
          )
        );
      });
    }
  })
  .listen(3000, "localhost");

/**
 * Parse the cookies from the client. This code was written by Dr Gary in the
 * example repo
 * @param {*} req request from client
 * @returns array of cookies from client
 */
const parseCookies = (req) => {
  var list = {},
    rc = req.headers.cookie;

  rc &&
    rc.split(";").forEach(function (cookie) {
      var parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

  return list;
};

/**
 * Get the cookies from the client and return an array of all items in the
 * json file that match the name and brand described in the cookie.
 *
 * @param {String} cookies cookies from client
 * @returns array if items that match cookies from client
 */
const getItemsFromCookies = (cookies) => {
  var favorites = new Array();
  Object.values(cookies).forEach((value) => {
    var arr = value.split(",");
    let name = arr[0];
    let brand = arr[1];

    data.contents.forEach((value) => {
      if (value.name == name && value.brand == brand) {
        favorites.push(value);
      }
    });
  });
  return favorites;
};

/**
 * Add new items to favorites list. Meant to be used after checking cookies to
 * see if favorites are already stored. Returns array containing all favorites
 * selected by user
 * @param {String} params params from payload recieved from client
 * @param {Array} curFavs array of current favorites from cookies
 */
const addFavorites = (params, curFavs) => {
  params.forEach((value, key) => {
    var arr = key.split(",");

    data.contents.forEach((value) => {
      if (value.name == arr[0] && value.brand == arr[1]) {
        if (
          !curFavs.some((e) => e.name == value.name && e.brand == value.brand)
        ) {
          curFavs.push(value);
        }
      }
    });
  });
};

/**
 * Helper function to write the header for a response to the client
 */
const writeHeader = (res, sCode, type) => {
  res.setHeader("Content-Type", type);
  res.writeHead(sCode);
};

/**
 * Format the data in plain text. Used if accept language requires text/plain
 */
const plainText = (input) => {
  let ret = "";
  for (var i in input) {
    ret +=
      `${input[i].name}    ${input[i].brand}    ${input[i].quantity}    ${input[i].aisle}    ${input[i].custom}` +
      "\n";
  }
  return ret;
};

/**
 * html to be returned to the client as a response
 */
const sendRes = (input) => {
  let resStart = `
    <html>
      <head>
        <title>Grocery List</title>
      </head>
      <body>
      `;
  let resMid = `
    <p>
    ${input}
    </p>
    `;
  let resEnd = `
    <span>
      Add More: 
      <a href="http://localhost:3000/">here</a>
    </span>
      </body>
    </html>`;

  return resStart + resMid + resEnd;
};

/**
 * Get the items from the json file and filter them based off of GET request.
 * Returns filtered items.
 */
const getItems = (aisle, custom) => {
  loadData();
  if ((aisle == "" || aisle === null) && (custom == "" || custom === null)) {
    msg = "No Filter Set. Displaying all Items";
    return data.contents;
  } else {
    if (aisle == "") {
      msg = "Filtered by diet: " + custom;
      filtered = data.contents.filter(function (item) {
        return item.custom.includes(custom);
      });
      return filtered;
    } else {
      msg = "Filtered by diet: " + custom + "<br>Filtered by Aisle: " + aisle;
      filtered = data.contents.filter(function (item) {
        return item.aisle == aisle && item.custom.includes(custom);
      });
      return filtered;
    }
  }
};
/**
 * Get the items from the favorites and filter them based off of GET request.
 * Returns filtered items. Should be combined with above function but ran out of time
 */
getFavoriteItems = (aisle, custom, favorites) => {
  loadData();
  if ((aisle == "" || aisle === null) && (custom == "" || custom === null)) {
    msg = "No Filter Set. Displaying all Favorites";
    return favorites;
  } else {
    if (aisle == "") {
      msg = "Filtered Favorites by diet: " + custom;
      filtered = favorites.filter(function (item) {
        return item.custom.includes(custom);
      });
      return filtered;
    } else {
      msg =
        "Filtered Favorites by diet: " +
        custom +
        "<br>Filtered by Aisle: " +
        aisle;
      filtered = favorites.filter(function (item) {
        return item.aisle == aisle && item.custom.includes(custom);
      });
      return filtered;
    }
  }
};

/**
 * Converts filtered data into html table rows. Returns a string of html
 * table rows
 */
const my_groceriesToTableRows = (input) => {
  var ret = "";
  for (var i in input) {
    ret += "<tr>\n";
    ret += `<td> <input type = "checkbox" id="favorite" name="${input[i].name},${input[i].brand}" /></td>\n`;
    ret += "<td>" + input[i].name + "</td>\n";
    ret += "<td>" + input[i].brand + "</td>\n";
    ret += "<td>" + input[i].aisle + "</td>\n";
    ret += "<td>" + input[i].quantity + "</td>\n";
    ret += "<td>" + input[i].custom + "</td>\n";
    ret += "</tr>\n";
  }
  return ret;
};

const my_favsToTableRows = (input) => {
  var ret = "";
  for (var i in input) {
    ret += "<tr>\n";
    ret += "<td>" + input[i].name + "</td>\n";
    ret += "<td>" + input[i].brand + "</td>\n";
    ret += "<td>" + input[i].aisle + "</td>\n";
    ret += "<td>" + input[i].quantity + "</td>\n";
    ret += "<td>" + input[i].custom + "</td>\n";
    ret += "</tr>\n";
  }
  return ret;
};

/**
 * Builds the table sent in the result. Returns html string of filtered
 * table data
 */
const my_grocieriesTable = (message, tableRows) => {
  let resTableStart = `
<html>
  <head>
    <title>Grocery List</title>
  </head>
  <body>
  <span>
  `;

  let resTableMid = `
  </span>
  <br>
  <br>
  <form action="favorites" method="post">
  <table>
    <tbody>
      <tr>
      <th>Favorite</th>
      <th>Product Name</th>
      <th>Brand Name</th>
      <th>Aisle Number</th>
      <th>Quantity</th>
      <th>Diet Type</th>
      </tr>
`;

  let resTableEnd = `
</tbody>
</table>
<input type="submit" value="Add Favorites" />
<br>
<br>
<span>
  Add More: 
  <a href="http://localhost:3000/">here</a>
</span>
</body>
</html>
`;

  return resTableStart + message + resTableMid + tableRows + resTableEnd;
};

/**
 * HTML to be sent as a response to the client. Creates a favorites table without
 * the add favorites column
 */
const my_favsTable = (message, tableRows) => {
  let resTableStart = `
<html>
  <head>
    <title>Grocery List</title>
  </head>
  <body>
  <span>
  `;

  let resTableMid = `
  </span>
  <br>
  <br>
  <table>
    <tbody>
      <tr>
      <th>Product Name</th>
      <th>Brand Name</th>
      <th>Aisle Number</th>
      <th>Quantity</th>
      <th>Diet Type</th>
      </tr>
`;

  let resTableEnd = `
</tbody>
</table>
<br>
<br>
<span>
  Add More: 
  <a href="http://localhost:3000/">here</a>
</span>
</body>
</html>
`;

  return resTableStart + message + resTableMid + tableRows + resTableEnd;
};
