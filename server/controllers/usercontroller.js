//express
const express = require("express");
const router = express.Router();

//database
const sequelize = require("../db");
const User = sequelize.import("../models/user.js");

//Authentication
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const bcrypt = require("bcrypt");

/************************************************ 
                    USER SIGNUP
************************************************/
router.post("/create", (req, res) => {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
  })
    .then((user) => {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      res.json({
        user: user,
        message: "User successfully created",
        sessionToken: token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

/************************************************ 
                    USER SIGNIN
************************************************/
router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.user.email } })
    .then((user) => {
      console.log(req.headers);
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          (err, matches) => {
            console.log(req.body.user.password, user.password, matches);
            if (matches) {
              let token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                {
                  expiresIn: 60 * 60 * 24,
                }
              );

              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          }
        );
      } else {
        res.status(500).send({ error: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
