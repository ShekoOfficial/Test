const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.status(200).send("OK");
});

// listen for requests :)
//const listener = app.listen(process.env.PORT, () => {
 // console.log(`Your app is listening on port ${listener.address().port}`);
