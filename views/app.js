var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
      .when('/',{templateUrl: './LoginOptions.html'})
      .when('/LoginOptions',{templateUrl: './LoginOptions.html'})
      .when('/Profile', {templateUrl: './profile.html'})
      .otherwise({redirectTo:'/'});
    
    

  }]);

