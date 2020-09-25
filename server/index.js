const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { mongoose } = require("./db.js");
const cardController = require("./controllers/cardController");
var app = express();
app.use(bodyParser.json());
app.use(cors());
const userRoutes = require("./routes/account");
const mainRoutes = require("./routes/main");
const sellerRoutes = require("./routes/seller");
app.use("/api/accounts", userRoutes);
app.use("/api", mainRoutes);
app.use("/api/seller", sellerRoutes);
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
 app.use("/", cardController);
