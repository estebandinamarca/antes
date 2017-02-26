//'use strict';
var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.controller('antesmap', function($scope) {


  // HTML5 Mode
  app.config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });
  });

  app.config(function($routeProvider) {
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
  
});