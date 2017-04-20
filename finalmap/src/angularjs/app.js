'use strict';
var app = angular.module('app', ['ngMap']);

app.controller('antesmap', function($scope, $http, NgMap) {

  var map;
  var vm = this;

  // $scope.lat = vm.lat;
  // $scope.lng = vm.lng;

  vm.lat = -33.448890;
  vm.lng = -70.669265;
  $scope.setCenter = vm.lat + ", " + vm.lng;
  $scope.setZoom = 11;

  $scope.lat = -33.448890;
  $scope.lng = -70.669265;

  NgMap.getMap().then(function(evMap) {

    //vm.map = evMap;
    $scope.map = evMap;
    //map = evMap;

    // vm.lat = -33.448890;
    // vm.lng = -70.669265;

    // $scope.centerMap = evMap.getCenter();
    // $scope.lat = $scope.centerMap.lat();
    // $scope.lng = $scope.centerMap.lng();

    // console.log(evMap.getCenter());
    // var centerMap = evMap.getCenter();
    // var lat = centerMap.lat();
    // var lng = centerMap.lng();
    // console.log(lat);
    // console.log(lng);
    // console.log('markers', evMap.markers);
    // console.log('shapes', evMap.shapes);

  });

  // FUNCTION GET
  var count = 0;
  function getPromotions() {

    console.log(count);
    if (count == 0){
      $scope.locations = "locations_a";
    } else if (count == 1) {
      $scope.locations = "locations_b";
    } else if (count == 2) {
      $scope.locations = "locations_a";
    } else {
      $scope.locations = "locations_b";
    }

    //console.log("$scope.lat $scope.lng: " +  $scope.lat + ", " + $scope.lng);
    //console.log("VM: " +  vm.lat + "," + vm.lng);

    $scope.jsonUrl = "http://192.168.40.139:8080/finalmap/" + $scope.locations + ".json";
    $http.get($scope.jsonUrl).success(function (data) {

      $scope.positions = data.locations;
      console.log('$scope.jsonUrl :' + $scope.jsonUrl);
      console.log('positions :' + JSON.stringify($scope.positions));


    });

    count++;

  };

  // GET ON LOAD
  getPromotions();








  // -----------------------------------------
  // OPEN/CLOSE INFO-WINDOWS - LOAD INFO PLACE
  // -----------------------------------------
  //$scope.place = '';
  $scope.showDetail = function(event, place) {
    $scope.place = place;
    $scope.map.showInfoWindow('iw_id', this);
  };

  $scope.showDetailBtn = function(event, place) {
    $scope.place = place;
    //$scope.center = new google.maps.LatLng( place.lat, place.lng );
    //$scope.map.setCenter($scope.center);
    $scope.map.showInfoWindow('iw_id', place.slug);
    //$scope.center = $scope.map.getCenter();
  };

  $scope.hideDetail = function() {
    $scope.map.hideInfoWindow('iw_id');
  };












  // ON DRAG MAP
  $scope.dragEvent = function(){
    //$scope.center = this.getCenter();

    // vm.lat = this.getCenter().lat();
    // vm.lng = this.getCenter().lng();
    // $scope.lat = this.getCenter().lat();
    // $scope.lng = this.getCenter().lng();

    //$scope.center = new google.maps.LatLng( vm.lat, vm.lng );
    //$scope.map.setCenter($scope.center);
    //var vm = this;

    // vm.setCenter = null;
    // vm.setCenter = vm.lat + ", " + vm.lng;
    // vm.setZoom = 11;


    getPromotions();
  };

  $scope.dragBtn = function(lat, lng){
    // vm.lat = lat;
    // vm.lng = lng;
    $scope.lat = lat;
    $scope.lng = lng;
    $scope.setCenter = lat + ", " + lng;

    getPromotions();
  };

});
