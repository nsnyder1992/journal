const Sequelize = require("sequelize");

const sequelize = new Sequelize("journal-walkthrough", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conection has been established successfullly");
  })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
  });

module.exports = sequelize;
