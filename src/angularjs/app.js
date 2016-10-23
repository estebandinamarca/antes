//'use strict';
var app = angular.module('app', ['ngMap']);

app.controller('antesmap', function($scope, $http, $timeout, NgMap) {
  
  NgMap.getMap().then(function(evtMap) {
    $scope.map = evtMap;
  });

  $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAvc8f2wLp2oBDCFPawvFuoJuIfjo6LYKY';
  $scope.pauseLoading = true;

  $timeout(function() {
    $scope.pauseLoading = false;
  }, 2000);

  $scope.cities = [{
      "id":"1",
      "name": "Santiago RM",
      "position":[-33.4378305,-70.65044920000003]
  }];
  
});