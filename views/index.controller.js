angular.module('app').controller("indexCtrl", function ($scope,$log, $q,$http, $location) {
    $scope.title = "Easy Auth";
    $scope.title2 = "Login with:";
    $scope.test = function () {
        alert("Passed.");
    }
    $scope.googleLogin = function () {
        $http.get("/auth/google",{"dataType":"jsonp"}).then(
            function (data) {
                $location.path("/profile");
            },
            function (err) {
                
            }
        );
        // /auth/google
        
    }
    
});