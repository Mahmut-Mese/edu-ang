const express = require("express");
const sql = require('../sql.js');
var router = express.Router();
var { Card } = require("../models/card");
/* router.get("/", (req, res) => {
  Card.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("erro in retrievign" + JSON.stringify(err, undefined, 2));
    }
  });
}); */
router.get("/", function(req, res) {
    /*    response.send(ARTICLES) */
    sql.getCards(function(result) {
        res.send(result)
    })
});


router.post("/", (req, res) => {
  var emp = new Card({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });
  emp.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("erro in retrievign" + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
