var { Card } = require("./models/card");

getCards = function(callback) { //function
    Card.find((err, docs) => {
      
      }).then(cards => callback(cards))
}
module.exports.getCards = getCards;
 
