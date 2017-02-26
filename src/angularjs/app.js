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

    if ( $location.path() == '/parques' ) {
      $scope.pageClass = 'parques';
      $scope.items = [
        { title: 'Place 1', id: 0, region: 'rm', category: 'parques' },
        { title: 'Place 2', id: 1, region: 'xi', category: 'parques' },
        { title: 'Place 3', id: 2, region: 'v', category: 'parques' }
      ];

    } else if ( $location.path() == '/rutas' ) {

      $scope.pageClass = 'parques';
      $scope.items = [
        { title: 'Place 1', id: 0, region: 'rm', category: 'rutas' },
        { title: 'Place 2', id: 1, region: 'xi', category: 'rutas' },
        { title: 'Place 3', id: 2, region: 'v', category: 'rutas' }
      ];

    } else if ( $location.path() == '/arqueologicos' ) {
      
      $scope.pageClass = 'arqueologicos';
      $scope.items = [
        { title: 'Place 1', id: 0, region: 'rm', category: 'arqueologicos' },
        { title: 'Place 2', id: 1, region: 'xi', category: 'arqueologicos' },
        { title: 'Place 3', id: 2, region: 'v', category: 'arqueologicos' }
      ];

    } else {

      $scope.pageClass = 'todo';
      $scope.items = [
        { title: 'Place 1', id: 0, region: 'rm', category: 'arqueologicos' },
        { title: 'Place 2', id: 1, region: 'xi', category: 'arqueologicos' },
        { title: 'Place 3', id: 2, region: 'v', category: 'arqueologicos' },
        { title: 'Place 1', id: 0, region: 'rm', category: 'rutas' },
        { title: 'Place 2', id: 1, region: 'xi', category: 'rutas' },
        { title: 'Place 3', id: 2, region: 'v', category: 'rutas' },
        { title: 'Place 1', id: 0, region: 'rm', category: 'parques' },
        { title: 'Place 2', id: 1, region: 'xi', category: 'parques' },
        { title: 'Place 3', id: 2, region: 'v', category: 'parques' }
      ];

    }

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