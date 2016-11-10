'use strict';
var app = angular.module('app', ['ngMap']);

app.controller('antesmap', function($scope, $http, $timeout, NgMap) {
  
  // -----------------------------------------
  // INIT NG-MAP
  // -----------------------------------------
  NgMap.getMap().then(function(evtMap) {
    $scope.map = evtMap;
  });
  $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAvc8f2wLp2oBDCFPawvFuoJuIfjo6LYKY';

  // -----------------------------------------
  // TIMEOUT 2 SECONDS INITIAL LOADING
  // -----------------------------------------
  $scope.pauseLoading = true;
  $timeout(function() {
    $scope.pauseLoading = false;
  }, 2000);

  // CENTER MAP
  $scope.cities = [{
    "id":"1",
    "name": "Santiago RM",
    "position":[-33.4378305,-70.65044920000003]
  }];

  // -----------------------------------------
  // GET JSON PLACES
  // -----------------------------------------
  $scope.places = [];
  $scope.selectedCity = [];
  function getPlaces() {
    // https://cdn.contentful.com/spaces/exxl6su6yxqc/entries?limit=10&access_token=38f9d13b1d29e3fce9d65ec6ccd3bb5f13e88f14e88c3e47a162bee0ea170266&content_type=place&fields.tags[all]=camping,trekking&fields.category=Patrimonio%20de%20la%20Humanidad
    // &fields.tags[in]=camping,trekking
    $scope.jsonUrl = "https://cdn.contentful.com/spaces/"+ $scope.spaceId +"/"+ $scope.infoType +"?"+ $scope.limitTo +"&access_token="+ $scope.accessToken;
    $http.get($scope.jsonUrl).then(function (response) {

      // ADD ICON INFO AND URL
      angular.forEach(response.data.items, function(item) {
        angular.forEach(response.data.includes.Asset, function(asset) {
          if ( item.fields.icon.sys.id == asset.sys.id ) {
            item.fields.icon.data = {};
            item.fields.icon.data = asset.fields;
          }
        });
      });

      $scope.places = response.data;
      $scope.selectedCity = $scope.cities[0];
      console.log('$scope.jsonUrl :' + $scope.jsonUrl);
    });
  }

  // -----------------------------------------
  // INFO TYPE
  // -----------------------------------------
  $scope.infoType = ['entries'];
  $scope.addInfoType = function(infoType) {
    $scope.infoType = [];
    $scope.infoType.push(infoType);
  };

  // -----------------------------------------
  // LIMIT TO
  // -----------------------------------------
  $scope.limitTo = ['limit=10'];
  $scope.addLimitTo = function(limitTo) {
    $scope.limitTo = [];
    $scope.limitTo.push(limitTo);
  };

  // -----------------------------------------
  // SPACE ID & ACCESS TOKEN
  // -----------------------------------------
  $scope.spaceId = ['exxl6su6yxqc'];
  $scope.accessToken = ['38f9d13b1d29e3fce9d65ec6ccd3bb5f13e88f14e88c3e47a162bee0ea170266'];

  // -----------------------------------------
  // INIT JSON PLACES
  // -----------------------------------------
  getPlaces();


  // =========================================
  // ============== ACTIONS ==================
  // =========================================

  // -----------------------------------------
  // OPEN/CLOSE INFO-WINDOWS - LOAD INFO PLACE
  // -----------------------------------------
  $scope.place = '';
  $scope.showDetailBtn = function(e, place) {
    $scope.place = place;
    $scope.center = new google.maps.LatLng( place.fields.location.lat, place.fields.location.lon );
    $scope.map.setCenter($scope.center);
    $scope.map.showInfoWindow('iw_id', place.sys.id);
    //$scope.center = $scope.map.getCenter();
  };
  $scope.showDetail = function(e, place) {
    $scope.place = place;
    $scope.map.showInfoWindow('iw_id', place.sys.id);
  };
  $scope.hideDetail = function() {
    $scope.map.hideInfoWindow('iw_id');
  };

  // --------------------------------------------
  // TOGGLE OFF-CANVAS & OVERLAY CSS
  // --------------------------------------------
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