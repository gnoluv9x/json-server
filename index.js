// server.js
import queryString from "query-string";
import jsonServer from "json-server";
// const queryString = require("query-string");
// const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 4110;

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Add the custom pagination middleware
server.use((req, res, next) => {
  // Check if the query parameters contain _limit and _page
  if (req.query.limit && req.query.page) {
    // Extract the values
    const limit = req.query.limit;
    const page = req.query.page;

    // Add the limit and page parameters with the extracted values
    req.query._limit = limit;
    req.query._page = page;

    // Remove the _limit and _page parameters from the query
    delete req.query.limit;
    delete req.query.page;
  }

  // Continue to the next middleware
  next();
});

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  }
  if (req.method === "PATCH") {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  // Check GET with pagination
  // If yes, custom output
  const headers = res.getHeaders();
  const totalCountHeader = headers["x-total-count"];
  if (req.method === "GET" && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);

    let data = res.locals.data;

    if (queryParams?.statusCode) {
      data = data.filter(item => item.statusCode === queryParams?.statusCode);
    }

    const result = {
      data,
      paginationVariables: {
        page: Number.parseInt(queryParams.page) || 1,
        limit: Number.parseInt(queryParams.limit) || 5,
        totalItemCount: Number.parseInt(data.length),
      },
    };

    return res.jsonp(result);
  }
  // otherwise
  res.jsonp(res.locals.data);
};

server.use(middlewares);
server.use("/api", router);
server.listen(PORT, () => {
  console.log(`JSON Server is running at port : ${PORT}`);
});
