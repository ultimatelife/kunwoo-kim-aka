module.controller("RadarCtrl", function ($scope, $resource) {
    var url = "/products/department/consideration_cnt/";
    $scope.labels =["보류", "속개회의", "수정가결", "원안가결", "일반소위", "소위원회", "조건부가결"];
    $scope.data = [[],[]];

    $scope.graph0 = "주거정비과";
    $scope.graph1 = "도시관리과";

    $scope.department_list = [];
    var res = $resource("/products/department/list");
    res.query(function (data) {
        for (var i = 0 ; i < data.length ; i++){
            $scope.department_list[i] = data[i]._id;
        }
    })

    $scope.request_query = function (department, num) {
        var res = $resource(url + department);
        res.query(function (data) {
            var arr = [];
            for (var i = 0, j = 0 ; i < $scope.labels.length ; i++){
                if (j < data.length && data[j]._id === $scope.labels[i]){
                    arr[i] = data[j++]["cnt"];
                    console.log("j = " + j + " arr : ", arr[i]);
                }
            }
            console.log("Grphat2 : " + arr[0]);
            $scope.data[num] = arr;
        })
    }

    $scope.datasetOverride = [
        {
            label : $scope.graph0,
            fill: true,
        },
        {
            label : $scope.graph1,
            fill: true,
        }];


    $scope.request_query($scope.graph0, 0);
    $scope.request_query($scope.graph1, 1);
});