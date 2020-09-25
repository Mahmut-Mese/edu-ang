const router = require("express").Router();
const Course = require("../models/course");
const faker = require("faker");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3({
    accessKeyId: "AKIA5HSEW327I6J3H4XH",
    secretAccessKey: "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",
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
router
  .route("/courses")
  .get(checkJWT, (req, res, next) => {
    Course.find({ owner: req.decoded.user._id })
      .populate("owner")
      .populate("category")
      .exec((err, courses) => {
        if (courses) {
          res.json({
            success: true,
            message: "courses",
            courses: courses,
          });
        }
      });
  })
  .post([checkJWT, upload.single("course_picture")], (req, res, next) => {
    console.log(req.file.location);
    let course = new Course();
    course.owner = req.decoded.user._id;
    course.category = req.body.categoryId;
    course.title = req.body.title;
    course.price = req.body.price;
    course.description = req.body.description;
    course.image = req.file.location;
    course.title = req.body.title;
    course.save();
    res.json({
      success: true,
      message: "succesfully added the course",
    });
  });
 router.get("/faker/test", (req, res, next) => {
  for (i = 0; i < 20; i++) {
    let course = new Course();
    course.category = "5ed816f50510fc1a101401d9";
    course.owner = "5ecfa0ed97649f254066f2a4";
    course.image = faker.image.cats();
    course.title = faker.commerce.productName();
    course.description = faker.lorem.words();
    course.price = faker.commerce.price();
    course.save();
  }
  res.json({
    message: "succesfully added 20 picture",
  });
}); 
module.exports = router;
