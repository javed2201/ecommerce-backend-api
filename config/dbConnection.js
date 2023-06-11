const mongoose = require('mongoose');

function dbConnection (){
    mongoose.connect('mongodb+srv://ecommerce:123ecommerce123@cluster0.utw4yqw.mongodb.net/ecommerce?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));
}

module.exports = dbConnection


// mongodb+srv://ecommerce:<password>@cluster0.utw4yqw.mongodb.net/?retryWrites=true&w=majority