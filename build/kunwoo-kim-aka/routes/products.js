var express = require('express');
var urlencode = require('urlencode');
var router = express.Router();
var Products = require('../models/ProductsSchema');

router.get("/", function (req, res) {
    res.render("products");
});

router.get("/graph", function (req, res) {
    res.render("graph");
});

router.get("/findAll", function (req, res) {
    Products.find({}, function (err, products) {
        if (err) throw err;
        // console.log(products);
        res.json(products);
    })
});

router.get("/department/count", function (req, res) {
    Products.aggregate([
        {
            $group: {
                _id : '$소관부서',
                cnt : { $sum : 1}
            }
        },
        {
            $sort : {
                cnt : -1
            }
        }
        ], function (err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json(results);
            }
        }
    );
})

router.get("/department/consideration_cnt/:department", function (req, res) {
    var department = urlencode.decode(req.params.department);

    Products.aggregate([
            {
                $match : {
                    $and : [
                        {소관부서 : department},
                        { $or: [{
                                심의결과 : "보류"
                            },{
                                심의결과 : "속개회의"
                            },{
                                심의결과 : "수정가결"
                            },{
                                심의결과 : "원안가결"
                            },{
                                심의결과 : "일반소위"
                            },{
                                심의결과 : "조건부가결"
                            }]
                        }
                    ]
                }
            },

            {
                $group: {
                    _id : "$심의결과",
                    cnt : { $sum : 1}
                }
            },
            {
                $sort : {
                    _id : 1
                }
            }
        ], function (err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json(results);
            }
        }
    );
})

router.get("/year/cnt", function (req, res) {
    Products.aggregate([
            {
                $group: {
                    _id : '$고시년도',
                    cnt : { $sum : 1},
                }
            }
        ], function (err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json(results);
            }
        }
    );
})

router.get("/department/list", function (req, res) {
    Products.aggregate([
            {
                $match:
                { $or: [{
                    심의결과 : "원안가결"
                },{
                    심의결과 : "보류"
                },{
                    심의결과 : "조건부가결"
                },{
                    심의결과 : "수정가결"
                },{
                    심의결과 : "속개회의"
                },{
                    심의결과 : "일반소위"
                }]
                }
            },
            {
                $group: {
                    _id : '$소관부서',
                }
            },
            {
                $sort : {
                    _id : 1
                }
            }
        ], function (err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json(results);
            }
        }
    );
})

router.get("/consideration/list", function (req, res) {
    Products.aggregate([
            {
                $group: {
                    _id : '$심의결과',
                    cnt : {
                        $sum : 1
                    }
                }
            },
            {
                $sort : {
                    cnt : -1
                }
            }
        ], function (err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json(results);
            }
        }
    );
})



module.exports = router;