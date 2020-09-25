const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, "config", function (err, decoded) {
      if (err) {
          console.log("err")
        res.json({
          success: false,
          message: "failed to authenticate token",
        });
      } else {
        console.log("err yok")
        req.decoded = decoded;
        next();
      }
    });
  } else {
    console.log("err 2")
    res.status(403).json({
      success: false,
      message: "no token provider",
    });
  }
};
