module.controller("DoughnutCtrl", function ($scope, $resource) {
    var res = $resource("/products/department/count");
    res.query(function (data) {
        $scope.receive_data = data;

        $scope.labels =[];
        $scope.data = [];

        for (var i = 0 ; i < $scope.receive_data.length ; i++){
            console.log("id : " + $scope.receive_data[i]._id + "  cnt : " + $scope.receive_data[i].cnt);
            $scope.labels[i] = $scope.receive_data[i]._id;
            $scope.data[i] = $scope.receive_data[i].cnt;
        }
    })
});