var express = require('express');
var router = express.Router();

var Test = require('../models/TestSchema');

router.get("/", function (req, res) {
    Test.find({}, function (err, test) {
        if (err) throw err;
        console.log(test);
        res.json(test);
    })
});

router.get("/save1", function (req, res) {
    var test = new Test({
        _id : 1,
        msg : "Hello Wrold!"
    })
    test.save(test,function (err) {
        res.json("ss");
    });
})

router.get("/save2", function (req, res) {
    var test = new Test({
        _id : 2,
        msg : "저는 OOO입니다."
    })
    test.save(test,function (err) {
        res.json("ss");
    });
})

module.exports = router;