//'use strict';
var app = angular.module('app', ['ngMap']);

app.controller('antesmap', function($scope, $http, $timeout, NgMap) {
  
  NgMap.getMap().then(function(evtMap) {
    $scope.map = evtMap;
  });

  $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAvc8f2wLp2oBDCFPawvFuoJuIfjo6LYKY';
  $scope.pauseLoading = true;

  // TIMEOUT 2 SECONDS INITIAL LOADING
  $timeout(function() {
    $scope.pauseLoading = false;
  }, 2000);

  $scope.cities = [{
      "id":"1",
      "name": "Santiago RM",
      "position":[-33.4378305,-70.65044920000003]
  }];

  $scope.places = [];
  $scope.selectedCity = [];
  function getPlaces(places) { 
    $http.get(places).then(function (response) {
      $scope.places = response.data;
      $scope.selectedCity = $scope.cities[0];
    });
  }
  getPlaces('../src/json/places.json');


  $scope.place = '';
  $scope.showDetail = function(e, place) {
    $scope.place = place;
    $scope.map.showInfoWindow('foo-iw', place.id);
  };

  $scope.hideDetail = function() {
    map.hideInfoWindow('foo-iw');
  };


  // ABRIR OFF CANVAS - CARGAR INFO PLACE
  $scope.openClose = '';
  $scope.overlay = '';
  $scope.toggleCanvas = function(){
    if ($scope.openClose === 'slideInLeft'){
      $scope.openClose = 'slide0utLeft';
      $scope.overlay = '';
    } else {
      $scope.openClose = 'slideInLeft';
      $scope.overlay = 'show';
    }
  };

  
});