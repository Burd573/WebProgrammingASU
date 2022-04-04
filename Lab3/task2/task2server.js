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
 * Load Data from file. If the file does not exist, create it
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
       * Load the form from index.html when url is at homepage
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
        let filteredItems = getItems(qstr.get("aisle"), qstr.get("custom"));

        // console.log(req.headers.accept);
        if (req.headers.accept == "application/json") {
          writeHeader(res, 200, "application/json");
          res.end(
            JSON.stringify(getItems(qstr.get("aisle"), qstr.get("custom")))
          );
          return;
        }

        if (req.headers.accept == "application/xml") {
          writeHeader(res, 406, "text/html");
          res.end(
            `<html><head><title>Grocery List</title></head><body>
            <span>This application accepts text/html text/plain or application/json</span></body></html>`
          );
          return;
        }

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
      req.on("end", () => {
        let params = new URLSearchParams(itemData);
        item.name = params.get("name");
        item.brand = params.get("brand");
        item.quantity = params.get("quantity");
        item.aisle = params.get("aisle");
        item.custom = params.get("custom");
        for (var i in item) {
          if (item[i] == "") {
            res.writeHead(400, {
              "Content-Type": "text/html",
            });
            res.end(sendRes(`Please enter value for ${i} `));
            return;
          }
        }
        if (isNaN(params.get("quantity"))) {
          res.writeHead(400, {
            "Content-Type": "text/html",
          });
          res.end(sendRes(`Please enter a number for quantity `));
          return;
        }

        if (isNaN(params.get("aisle"))) {
          res.writeHead(400, {
            "Content-Type": "text/html",
          });
          res.end(sendRes(`Please enter a number for aisle `));
          return;
        }
        writeData();
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

const writeHeader = (res, sCode, type) => {
  res.setHeader("Content-Type", type);
  res.writeHead(sCode);
};

const clearItem = () => {
  item.name = "";
  item.brand = "";
  item.quantity = "";
  item.aisle = "";
  item.custom = "";
};

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
