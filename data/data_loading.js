const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
});
myEmitter.emit('event');
myEmitter.setMaxListeners(10);


var csv = require("fast-csv");
var Lead = require('../models/ProductsSchema');
var fs = require('fs');
var path = require('path');
var mongoose = require("mongoose");

process.setMaxListeners(20);

var argv = require('minimist')(process.argv.slice(1));
var db_ip = "localhost";
// db_ip = argv["ip"];
// if(argv["ip"] != null){
//     db_ip = argv["ip"];
// }
console.log(db_ip);

mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('connection succesful'))
.catch((err) => console.error(err));

var Products = require("../models/ProductsSchema");

var filePath = path.join(__dirname, "data.csv");
fs.exists(filePath, function (exist) {
    if (exist){
        var stream = fs.createReadStream(filePath);
        csv.fromStream(stream, {
            headers : [
                "고시년도",
                "회차",
                "개최일자",
                "안건일련번호",
                "소관부서",
                "안건제목",
                "심의결과",
                "개요"
            ]
        }).on("data", function (data) {
            var newProduct = new Products();
            newProduct.고시년도 = data["고시년도"];
            newProduct.회차 = data["회차"];
            newProduct.개최일자 = data["개최일자"];
            newProduct.안건일련번호 = data["안건일련번호"];
            newProduct.소관부서 = data["소관부서"];
            newProduct.안건제목 = data["안건제목"];
            newProduct.심의결과 = data["심의결과"];
            newProduct.개요 = data["개요"];

            newProduct.save(function (err, data) {
                console.log("db_ip" + db_ip);
                if (err) console.log(err);
                else {
                    console.log('Saved ', data );
                    mongoose.connection.close();
                }
            })
        })
    }else {
        console.log("file don't exist");
    }
})

