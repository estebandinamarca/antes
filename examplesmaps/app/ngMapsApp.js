'use strict';

var app = angular.module('ngMapTestApp', ['ngMap']);

app.controller('ngMapCtrl', function ($scope, $http) {

    $scope.setCenter = "[-33.437554, -70.650490]";
    $scope.setZoom = 11;

    // FUNCTION GET
    var count = 0;
    function getPromotions() {

      console.log(count);
      if (count == 0){
        $scope.locations = "locations_a";
      } else {
        $scope.locations = "locations_b";
      }

      //$scope.positions = [];
      $scope.jsonUrl = "http://192.168.1.166:8080/examplesmaps/app/" + $scope.locations + ".json";
      $http.get($scope.jsonUrl).success(function (data) {

        $scope.positions = data.locations;
        console.log('$scope.jsonUrl :' + $scope.jsonUrl);
        console.log('positions :' + JSON.stringify($scope.positions));

      });

      count++;

    };

    $scope.set = function(){
      var vm = this;
      vm.setCenter = null;
      vm.setCenter = "[-33.618608, -70.590606]";
      vm.setZoom = 11;
      getPromotions();
    };


    // BOTON GET
    $scope.toggleAddAndRemoveMarkers = function(){
        getPromotions();
    };

    // GET INICIAL
    getPromotions();

    $scope.removeMarkers = function () {
        $scope.positions = [];
    }

});
