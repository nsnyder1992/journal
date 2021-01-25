//environment
require("dotenv").config();

//express
const express = require("express");
const app = express();

//database
const sequelize = require("./db");
const journal = require("./controllers/journalcontroller");
const user = require("./controllers/usercontroller");

sequelize.sync();

//headers
app.use(require("./middleware/headers"));

//options
app.options("*", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.use(express.json());

////////////////////////////////////////////////
//Exposed Routes
////////////////////////////////////////////////
app.use("/user", user);

////////////////////////////////////////////////
//Protected Routes
////////////////////////////////////////////////
app.use(require("./middleware/validate-session"));
app.use("/journal", journal);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});

///////////////////////////////////////////////
// Quick and dirty way to create some endpoints
///////////////////////////////////////////////
// app.use("/message", function (req, res) {
//   res.send(
//     JSON.stringify({
//       message: "this is a message",
//     })
//   );
// });

// app.use("/nick", function (req, res) {
//   res.send(
//     JSON.stringify({
//       name: "Nick Snyder",
//       age: 28,
//     })
//   );
// });
