const mongoose = require('mongoose');
var Card = mongoose.model('Card', {
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number },
})
module.exports = { Card };