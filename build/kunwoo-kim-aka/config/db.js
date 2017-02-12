var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('connection succesful'))
.catch((err) => console.error(err));