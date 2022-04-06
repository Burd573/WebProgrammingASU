const fs = require("fs");
const http = require("http");
const url = require("url").URL;

const ROOT_DIR = "html/";
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
    console.log("Reading file");
    data.contents = JSON.parse(fs.readFileSync(file));
  } else {
    console.log("Creating file");
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
    if (req.method == "GET") {
      let urlObj = new URL(req.url, "http://localhost:3000");
      let qstr = urlObj.searchParams;

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
         * If the request is a GET request, the path is my_groceries, and
         * accept language is not specified in the request, filter the aisle
         * and brand name from the contents in the json file, and set the
         * responce language to text/html
         */
        let rows = toTableRows(filteredItems);
        writeHeader(res, 200, "text/html");
        res.end(buildTable(msg, rows));
      } else {
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
       * If the request is a POST request, taske the data from the payload and
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
 * Converts filtered data into html table rows. Returns a string of html
 * table rows
 */
const toTableRows = (input) => {
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
const buildTable = (message, tableRows) => {
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
<span>
  Add More: 
  <a href="http://localhost:3000/">here</a>
</span>
</body>
</html>
`;

  return resTableStart + message + resTableMid + tableRows + resTableEnd;
};
