module.controller("BarCtrl", function ($scope, $resource) {
    var res = $resource("/products/year/cnt");

    res.query(function (data) {
        $scope.receive_data = data;

        $scope.labels = [];
        $scope.series = ['Count'];
        $scope.data = [[]];

        for (var i = 0 ; i < $scope.receive_data.length ; i++){
            console.log("id : " + $scope.receive_data[i]._id + "  cnt : " + $scope.receive_data[i].cnt);
            $scope.labels[i] = $scope.receive_data[i]._id;
            $scope.data[i] = $scope.receive_data[i].cnt;
        }
    });
})