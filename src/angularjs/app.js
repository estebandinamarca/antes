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
        controller: 'inicioController'
      })
      .when('/parques', {
        templateUrl: 'parques.html',
        controller: 'parquesController'
      })
      .when('/arqueologicos', {
        templateUrl: 'arqueologicos.html',
        controller: 'arqueologicosController'
      })
      .when('/rutas', {
        templateUrl: 'rutas.html',
        controller: 'rutasController'
      });
    $locationProvider
      .html5Mode({
        enabled: true
        //requireBase: false,
      })
      .hashPrefix('!');
});

app.controller('inicioController', function($scope) {
    $scope.pageClass = 'inicio';
});

app.controller('parquesController', function($scope) {
    $scope.pageClass = 'parques';
});

app.controller('arqueologicosController', function($scope) {
    $scope.pageClass = 'arqueologicos';
});

app.controller('rutasController', function($scope) {
    $scope.pageClass = 'rutas';
});