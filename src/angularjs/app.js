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

  $scope.isActiveCat = function (viewLocation) { 
    return viewLocation === $location.search().category;
  };

});

app.controller('inicioController', function($scope, $http, $location) {

  // -----------------------------------------
  // SPACE ID + ACCESS TOKEN + CONTENT TYPE + INFO TYPE
  // -----------------------------------------
  $scope.spaceId = ['exxl6su6yxqc'];
  $scope.accessToken = ['38f9d13b1d29e3fce9d65ec6ccd3bb5f13e88f14e88c3e47a162bee0ea170266'];
  $scope.contentType = ['&content_type=place'];
  $scope.infoType = ['entries'];

  // -----------------------------------------
  // LOCATIONS SEARCH REGION TEST
  // -----------------------------------------
  if ( $location.search().region == 'rm' ) {
    $scope.testing = 'region rm';
  } else {
    $scope.testing = 'region empty';
  }

  // -----------------------------------------
  // LOCATION PATH CATEGORY
  // -----------------------------------------
  if ( $location.path() == '/parques' ) {

    $scope.pageClass = 'parques';
    $scope.category = "Parque%20Nacional";

  } else if ( $location.path() == '/rutas' ) {

    $scope.pageClass = 'rutas (Monumento Nacional)';
    $scope.category = "Monumento%20Nacional";

  } else if ( $location.path() == '/arqueologicos' ) {

    $scope.pageClass = 'arqueologicos (Patrimonio de la Humanidad)';
    $scope.category = 'Patrimonio%20de%20la%20Humanidad';

  } else {

    $scope.pageClass = 'todo';
    $scope.category = '';

  }

  // -----------------------------------------
  // LIMIT TO
  // -----------------------------------------
  $scope.limitTo = ['&limit=10'];
  $scope.addLimitTo = function(limitTo) {
    $scope.limitTo = [];
    $scope.limitTo.push(limitTo);
  };

  // -----------------------------------------
  // GET JSON PLACES
  // -----------------------------------------
  $scope.places = [];
  function getPlaces() {
    $scope.jsonUrl = "https://cdn.contentful.com/spaces/"+ $scope.spaceId +"/"+ $scope.infoType +"?access_token="+ $scope.accessToken + $scope.limitTo + $scope.contentType + "&fields.category=" + $scope.category;
    $http.get($scope.jsonUrl).then(function (response) {

      console.log('$scope.jsonUrl :' + $scope.jsonUrl);

      // ADD ICON INFO AND URL
      angular.forEach(response.data.items, function(item) {
        angular.forEach(response.data.includes.Asset, function(asset) {
          if ( item.fields.icon.sys.id == asset.sys.id ) {
            item.fields.icon.data = {};
            item.fields.icon.data = asset.fields;
          }
          if ( item.fields.cover.sys.id == asset.sys.id ) {
            item.fields.cover.data = {};
            item.fields.cover.data = asset.fields;
          }
        });
      });

      $scope.places = response.data;
      
    });
  }

  // -----------------------------------------
  // TEST CHANGE LOCATION
  // -----------------------------------------
  $scope.changeLocation = function(region) {
    console.log(region);
    $location.search('region', region);
    $scope.testing = 'region rm';
  }

  getPlaces();

});

app.controller('placeController', function($scope, $location) {

  // ---------------------------------------------------
  // SPACE ID + ACCESS TOKEN + CONTENT TYPE + INFO TYPE
  // ---------------------------------------------------
  $scope.spaceId = ['exxl6su6yxqc'];
  $scope.accessToken = ['38f9d13b1d29e3fce9d65ec6ccd3bb5f13e88f14e88c3e47a162bee0ea170266'];
  $scope.contentType = ['&content_type=place'];
  $scope.infoType = ['entries'];

  // ---------------------------------------------------
  // --
  // ---------------------------------------------------
  $scope.pageClass = 'place';
  $scope.placeId = '';
  $scope.place = [];

  if ( $location.search().id ) {
    $scope.placeId = $location.search().id;
  } else {
    console.log('no hay location search id');
  }

  function getPlace() {
    $scope.jsonUrl = "https://cdn.contentful.com/spaces/"+ $scope.spaceId +"/"+ $scope.infoType +"?access_token="+ $scope.accessToken + $scope.contentType + "&sys.id=" + $scope.placeId;
    $http.get($scope.jsonUrl).then(function (response) {
      console.log('$scope.jsonUrl :' + $scope.jsonUrl);
      // ADD ICON INFO AND URL
      angular.forEach(response.data.items, function(item) {
        angular.forEach(response.data.includes.Asset, function(asset) {
          if ( item.fields.icon.sys.id == asset.sys.id ) {
            item.fields.icon.data = {};
            item.fields.icon.data = asset.fields;
          }
          if ( item.fields.cover.sys.id == asset.sys.id ) {
            item.fields.cover.data = {};
            item.fields.cover.data = asset.fields;
          }
        });
      });
      $scope.place = response.data;
      
    });
  }

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