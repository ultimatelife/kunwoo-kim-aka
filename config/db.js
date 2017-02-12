var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://dbhost:27017/test')
    .then(() => console.log('connection succesful'))
.catch((err) => console.error(err));