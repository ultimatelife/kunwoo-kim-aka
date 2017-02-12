var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Products = Schema({
    "고시년도" : Number,
    "회차" : Number,
    "개최일자" : Date,
    "안건일련번호" : Number,
    "소관부서" : String,
    "안건제목" : String,
    "심의결과" : String,
    "개요" : String
});

module.exports = mongoose.model('Products', Products);