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
      { title: 'parque_algo_00_parques', id: 0, region: 'rm', category: 'parques' },
      { title: 'parque_algo_01_arqueologicos', id: 1, region: 'xi', category: 'arqueologicos' },
      { title: 'parque_algo_02_rutas', id: 2, region: 'v', category: 'rutas' }
    ];
});

app.controller('parquesController', function($scope) {
    $scope.pageClass = 'parques';
    $scope.items = [
      { title: 'parque_algo_00_parques', id: 0, region: 'rm', category: 'parques' }
    ];
    if ( $location.search().region == 'rm' ) {
      $scope.pageClass = 'parques-rm';
    } else {
      $scope.pageClass = 'parques';
    }
});

app.controller('arqueologicosController', function($scope) {
    $scope.pageClass = 'arqueologicos';
});

app.controller('rutasController', function($scope) {
    $scope.pageClass = 'rutas';
});