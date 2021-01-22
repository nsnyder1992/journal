// const jwt = require("jsonwebtoken");
// const User = require("../db").import("../models/user");

// const validateSession = (req, res, next) => {
//   console.log(req.headers);
//   const token = req.headers.authorization;
//   console.log("token -->", token);
//   if (!token) {
//     return res.status(403).send({ auth: false, message: "No token provided" });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
//       console.log("decodeToken -->", decodeToken);
//       if (!err && decodeToken) {
//         User.findOne({
//           where: {
//             id: decodeToken.id,
//           },
//         })
//           .then((user) => {
//             console.log("user -->", user);

//             if (!user) throw err;
//             console.log("req -->", req);
//             req.user = user;
//             return next();
//           })
//           .catch((err) => next(err));
//       } else {
//         req.errors = err;
//         return res.status(500).send("Not Authorized");
//       }
//     });
//   }
// };

// module.exports = validateSession;

const jwt = require("jsonwebtoken");
const User = require("../db").import("../models/user");

const validateSession = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;

  if (!token) {
    console.log("No Token");
    return res
      .status(403)
      .send({ auth: false, message: "Please provide token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
    if (err || !decodeToken) {
      console.log("Token not Verified");
      res.errors = err;
      return res.status(500).json({ error: err, message: "Not Authorized" });
    }

    User.findOne({
      where: {
        id: decodeToken.id,
      },
    })
      .then((user) => {
        console.log(user);
        if (!user) throw err;
        req.user = user;
        return next();
      })
      .catch((err) => next(err));
  });
};

module.exports = validateSession;
