'use strict';
var app = angular.module('app', ['ngMap']);

app.controller('antesmap', function(NgMap) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });

});
