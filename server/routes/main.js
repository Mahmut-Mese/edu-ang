const router = require("express").Router();
Category = require("../models/category");
const async = require("async");

const Course = require("../models/course");
const faker = require("faker");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3({
  accessKeyId: "AKIA5HSEW327I6J3H4XH",
  secretAccessKey: "z8BWESl4Gc7bq1EHcFJzGI++c7ww/E6hqf+XZ5Vm",
});
const checkJWT = require("../middlewares/check-jwt");
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
router.get("/courses", (req, res, next) => {
  const perPage = 10;
  const page = req.query.page;
  async.parallel(
    [
      function (callback) {
        Course.find({}).count({}, (err, count) => {
          var totalCourses = count;
          callback(err, totalCourses);
        });
      },
      function (callback) {
        Course.find({})
          .skip(perPage * page)
          .limit(perPage)
          .populate("category")
          .populate("owner")
          .exec((err, courses) => {
            if (err) return next(err);
            callback(err, courses);
          });
      },
    ],
    function (err, results) {
      var totalCourses = results[0];
      var courses = results[1];
      res.json({
        success: true,
        message: "category",
        courses: courses,
        totalCourses: totalCourses,
        pages: Math.ceil(totalCourses / perPage),
      });
    }
  );
});
router
  .route("/categories")
  .get((req, res, next) => {
    Category.find({}, (err, categories) => {
      res.json({
        success: true,
        message: "success",
        categories: categories,
      });
    });
  })
  .post([checkJWT, upload.single("category_picture")], (req, res, next) => {
    console.log(req);
    let category = new Category();
    category.description = req.body.description;
    category.image = req.file.location;
    category.title = req.body.title;
    category.save();
    res.json({
      success: true,
      message: "success",
    });
  });
router.get("/categories/:id", (req, res, next) => {
  console.log("categories");
  const perPage = 10;
  const page = req.query.page;
  async.parallel(
    [
      function (callback) {
        Course.count({ category: req.params.id }, (err, count) => {
          var totalCourses = count;
          callback(err, totalCourses);
        });
      },
      function (callback) {
        Course.find({ category: req.params.id })
          .skip(perPage * page)
          .limit(perPage)
          .populate("category")
          .populate("owner")
          .exec((err, courses) => {
            if (err) return next(err);
            callback(err, courses);
          });
      },
      function (callback) {
        Category.findOne({ _id: req.params.id }, (err, category) => {
          callback(err, category);
        });
      },
    ],
    function (err, results) {
      var totalCourses = results[0];
      var courses = results[1];
      var category = results[2];
      res.json({
        success: true,
        message: "category",
        courses: courses,
        categoryname: category.name,
        totalCourses: totalCourses,
        pages: Math.ceil(totalCourses / perPage),
      });
    }
  );
});
router.get("/course/:id", (req, res, next) => {
  Course.findById({ _id: req.params.id })
    .populate("category")
    .populate("owner")
    .exec((err, course) => {
      if (err) {
        res.json({
          success: false,
          message: "course is not found",
        });
      } else {
        if (course) {
          res.json({
            success: true,
            course: course,
          });
        }
      }
    });
});
module.exports = router;
