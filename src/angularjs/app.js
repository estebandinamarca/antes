'use strict';
var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'inicio.html',
        controller: 'inicioController'
      })
      .when('/parques', {
        templateUrl: 'parques.html',
        controller: 'inicioController'
      })
      .when('/arqueologicos', {
        templateUrl: 'arqueologicos.html',
        controller: 'inicioController'
      })
      .when('/rutas', {
        templateUrl: 'rutas.html',
        controller: 'inicioController'
      })
      .when('/place', {
        templateUrl: 'place.html',
        controller: 'placeController'
      });
    // $locationProvider
    //   .html5Mode({
    //     enabled: true,
    //     requireBase: true
    //   })
    //   .hashPrefix('!');
});

app.controller('menuController', function($scope, $location) { 
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
});

app.controller('inicioController', function($scope, $location) {

    // if ( $location.search().category == 'parques' ) {
    //   $scope.pageClass = 'parques';
    // } else {
    //   $scope.pageClass = 'parques';
    // }

    $scope.pageClass = 'inicio';
    $scope.items = [
      { title: 'Parques y Reservas', id: 0, region: 'rm', category: 'parques' },
      { title: 'Arqueología', id: 1, region: 'xi', category: 'arqueologicos' },
      { title: 'Paleontología', id: 2, region: 'v', category: 'rutas' }
    ];
});

app.controller('placeController', function($scope, $location) {
    
    $scope.pageClass = 'place';

    $scope.place = [
      {
        id: 0,
        title: 'Parque Nacional Torres del Paine',
        region: 'xii',
        category: 'parques',
        description: 'Este es un lugar muy lindo.'
      }
    ];

    // if ( $location.search().region == 'rm' ) {
    //   $scope.pageClass = 'parques-rm';
    // } else {
    //   $scope.pageClass = 'parques';
    // }
});

// app.controller('parquesController', function($scope, $location) {
//     $scope.pageClass = 'parques';
//     $scope.items = [
//       { title: 'parque_algo_00_parques', id: 0, region: 'rm', category: 'parques' }
//     ];
//     if ( $location.search().region == 'rm' ) {
//       $scope.pageClass = 'parques-rm';
//     } else {
//       $scope.pageClass = 'parques';
//     }
// });

// app.controller('arqueologicosController', function($scope) {
//     $scope.pageClass = 'arqueologicos';
// });

// app.controller('rutasController', function($scope) {
//     $scope.pageClass = 'rutas';
// });