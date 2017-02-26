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
    // $locationProvider
    //   .html5Mode({
    //     enabled: true,
    //     requireBase: true
    //   })
    //   .hashPrefix('!');
});

app.controller('inicioController', function($scope) {
    $scope.pageClass = 'inicio';
    $scope.items = [
      { title: 'algo_inicio_0', id: 0 },
      { title: 'algo_inicio_1', id: 1 },
      { title: 'algo_inicio_2', id: 2 }
    ];
});

app.controller('parquesController', function($scope) {
    $scope.pageClass = 'parques';
    $scope.items = [
      { title: 'algo_inicio_00', id: 0 },
      { title: 'algo_inicio_11', id: 1 },
      { title: 'algo_inicio_22', id: 2 }
    ];
});

app.controller('arqueologicosController', function($scope) {
    $scope.pageClass = 'arqueologicos';
});

app.controller('rutasController', function($scope) {
    $scope.pageClass = 'rutas';
});