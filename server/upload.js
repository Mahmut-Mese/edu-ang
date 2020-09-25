const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
module.exports = function (req, res, next) {
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
};
