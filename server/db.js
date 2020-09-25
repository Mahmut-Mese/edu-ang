const mongoose = require('mongoose');
const config = require('./config');
/* mongoose.connect('mongodb://localhost:27017/edu', (err) => {
    if (!err)
        console.log('mongo db connected')
    else
        console.log('mongo db  not connected' + JSON.stringify(err, undefined, 2))
}); */
mongoose.connect(config.database, (err) => {
    if (!err) console.log("mongo db connected good");
    else
      console.log("mongo db not connected" + JSON.stringify(err, undefined, 2));
  });
module.exports = mongoose;