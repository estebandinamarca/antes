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
          templateUrl: 'page-home.html',
              controller: 'mainController'
        })
        .when('/about', {
          templateUrl: 'page-about.html',
              controller: 'aboutController'
        })
        .when('/contact', {
          templateUrl: 'page-contact.html',
              controller: 'contactController'
        });

  });

  app.controller('mainController', function($scope) {
      $scope.pageClass = 'page-home';
  });

  app.controller('aboutController', function($scope) {
      $scope.pageClass = 'page-about';
  });

  app.controller('contactController', function($scope) {
      $scope.pageClass = 'page-contact';
  });
  
});