'use strict';
var app = angular.module('app', ['ui.router', 'ngAnimate', 'oc.lazyLoad']);

app.config(function($stateProvider) {
  // An array of state definitions
  var states = [
  { 
    name: 'hello', 
    url: '/hello', 
      // Using component: instead of template:
      component: 'hello'  
    },
    
    { 
      name: 'about', 
      url: '/about', 
      component: 'about'
    },
    
    { 
      name: 'people', 
      url: '/people', 
      component: 'people',
      // This state defines a 'people' resolve
      // It delegates to the PeopleService to HTTP fetch (async)
      // The people component receives this via its `bindings: `
      resolve: {
        people: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },
    
    { 
      name: 'person', 
      // This state takes a URL parameter called personId
      url: '/people/{personId}', 
      component: 'person',
      // This state defines a 'person' resolve
      // It delegates to the PeopleService, passing the personId parameter
      resolve: {
        person: function(PeopleService, $transition$) {
          return PeopleService.getPerson($transition$.params().personId);
        }
      }
    }
    ]
    
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});

// To account for plunker embeds timing out, preload the async data
myApp.run(function($http) {
  $http.get('data/people.json', { cache: true });
});





















app.controller('menuController', function($scope, $location) {

  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  $scope.isActiveCat = function (viewLocation) { 
    return viewLocation === $location.search().category;
  };

});

app.controller('inicioController', function($scope, $http, $location, $timeout) {

  // --------------------------------------------------
  // FADE BETWEEN PAGES
  // --------------------------------------------------
  $scope.fade = true;
  $timeout(function () {
    $scope.fade = false;
  }, 600);

  // --------------------------------------------------
  // SPACE ID + ACCESS TOKEN + CONTENT TYPE + INFO TYPE
  // --------------------------------------------------
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
      //console.log(JSON.stringify($scope.places));
      
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

angular.module('app').controller('placeController', function($scope, $http, $location, $timeout, $filter, $sce) {

  $scope.fade = true;
  $timeout(function () {
    $scope.fade = false;
  }, 600);

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

  function onLoad() {
    vrView = new VRView.Player('#vrview', {
      width: '100%',
    //height: 480,
    image: 'taj-mahal.jpg',
    is_stereo: false,
    is_autopan_off: true
  });
  }

  window.addEventListener('load', onLoad);

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

  getPlace();


  
});

