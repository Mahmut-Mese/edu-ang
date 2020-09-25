const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const checkJwt = require("../middlewares/check-jwt");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: "AKIA5HSEW327I6J3H4XH",
  secretAccessKey: "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",
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ecomwebapplication",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.post("/signup", (req, res, next) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.isTeacher = req.body.isTeacher;
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
      res.json({
        success: false,
        message: "account already exist",
      });
    } else {
      user.save((err, doc) => {
        if (!err) {
          console.log("not err");
        } else {
          console.log(
            "error in retrieving " + JSON.stringify(err, undefined, 2)
          );
        }
      });
      var token = jwt.sign({ user: user }, "config", { expiresIn: "7d" });
      res.json({
        success: true,
        message: "enjoy your token",
        token: token,
        address: user.address,
      });
    }
  });
});
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: "Autenticated failed login not found",
      });
    } else if (user) {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: "Authentication failed wrong password",
        });
      } else {
        var token = jwt.sign({ user: user }, "config", { expiresIn: "7d" });
        res.json({
          success: true,
          message: "enjoy your token",
          token: token,
        });
      }
    }
  });
});
router
  .route("/profile")
  .get(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        address: user.address,
        user: user,
        message: "succesful",
      });
      console.log(user);
    });
  })
  .post(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);
      console.log(req.body);
      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;
      user.save();
      res.json({
        success: true,
        message: "succesfully edited",
      });
    });
  });
router
  .route("/address")
  .get(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        address: user.address,
        message: "succesful",
      });
    });
  })
  .post(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);
      console.log(req.body, user);
      if (req.body.addr1) user.address.addr1 = req.body.addr1;
      if (req.body.addr2) user.address.addr2 = req.body.addr2;
      if (req.body.city) user.address.city = req.body.city;
      if (req.body.state) user.address.state = req.body.state;
      if (req.body.country) user.address.country = req.body.country;

      user.save();
      res.json({
        success: true,
        message: "succesfully edited",
      });
    });
  });
router
  .route("/picture")
  .get(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        picture: user.picture,
        message: "succesful",
      });
    });
  })
  .post([checkJwt, upload.single("profile_picture")], (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);
      console.log(req.file);
      if (req.file.location) user.picture = req.file.location;
      user.save();
      res.json({
        success: true,
        message: "image uploaded",
      });
    });
  });
module.exports = router;
