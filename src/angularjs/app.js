//'use strict';
var app = angular.module('app', ['ngRoute', 'ngAnimate']);

// $provide.decorator('$sniffer', function($delegate) {
//   $delegate.history = false;
//   return $delegate;
// });

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'inicio.html',
            controller: 'mainController'
      })
      .when('/parques', {
        templateUrl: 'parques.html',
            controller: 'aboutController'
      })
      .when('/arqueologicos', {
        templateUrl: 'arqueologicos.html',
            controller: 'aboutController'
      })
      .when('/rutas', {
        templateUrl: 'rutas.html',
            controller: 'contactController'
      });
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: true
      });
});

app.controller('mainController', function($scope) {
    $scope.pageClass = 'parques';
});

app.controller('aboutController', function($scope) {
    $scope.pageClass = 'arqueologicos';
});

app.controller('contactController', function($scope) {
    $scope.pageClass = 'rutas';
});

app.controller('contactController', function($scope) {
    $scope.pageClass = 'rutas';
});