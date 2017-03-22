'use strict';
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'oc.lazyLoad']);

app.filter('mathround', function() {
  return function(input) {
    return Math.ceil(input);
  };
});

app.config(function($routeProvider, $locationProvider, $controllerProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../googlevr/inicio.html',
      controller: 'inicioController'
    })
    .when('/parques', {
      templateUrl: '../googlevr/parques.html',
      controller: 'inicioController'
    })
    .when('/arqueologicos', {
      templateUrl: '../googlevr/arqueologicos.html',
      controller: 'inicioController'
    })
    .when('/rutas', {
      templateUrl: '../googlevr/rutas.html',
      controller: 'inicioController'
    })
    .when('/place', {
      templateUrl: '../googlevr/place.html',
      controller: 'placeController',
      resolve: {
        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'app',
            files: ['../googlevr/vr/build/vrview.js']

          }]);
        }]
      }
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

app.controller('placeController', function($scope, $http, $location, $timeout) {

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
  // GET PLACE INFO
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

      // IMAGENES
      angular.forEach(response.data.items, function(item) {
        angular.forEach(response.data.includes.Asset, function(asset) {

          // filtro icon
          if ( item.fields.icon.sys.id == asset.sys.id ) {
            item.fields.icon.data = {};
            item.fields.icon.data = asset.fields;
          }

          // filtro cover
          if ( item.fields.cover.sys.id == asset.sys.id ) {
            item.fields.cover.data = {};
            item.fields.cover.data = asset.fields;
          }

          // filtro gallery
          angular.forEach(item.fields.gallery, function(gal) {
            if ( gal.sys.id == asset.sys.id ) {
              gal.data = {};
              gal.data = asset.fields;
            }
          });

        });
      });

      $scope.place = response.data;
      console.log(JSON.stringify($scope.place));

      // GOOGLE VR VIEW
      //var img = 'taj-mahal';
      var img = response.data.items[0].fields.cover.data.file.url;
      function onLoad() {
      var vrView = new VRView.Player('#vrview', {
          width: '100%',
          image: 'http:' + img,
          is_stereo: false,
          is_autopan_off: true
        });
      }
      onLoad();
      //window.addEventListener('load', onLoad);

    });
  }

  getPlace();


  // ---------------------------------------------------
  // GALERIA
  // ---------------------------------------------------
  var initPhotoSwipeFromDOM = function(gallerySelector) {

      // parse slide data (url, title, size ...) from DOM elements 
      // (children of gallerySelector)
      var parseThumbnailElements = function(el) {
          var thumbElements = el.childNodes,
              numNodes = thumbElements.length,
              items = [],
              figureEl,
              linkEl,
              size,
              item;

          for(var i = 0; i < numNodes; i++) {

              figureEl = thumbElements[i]; // <figure> element

              // include only element nodes 
              if(figureEl.nodeType !== 1) {
                  continue;
              }

              linkEl = figureEl.children[0]; // <a> element

              size = linkEl.getAttribute('data-size').split('x');

              // create slide object
              item = {
                  src: linkEl.getAttribute('href'),
                  w: parseInt(size[0], 10),
                  h: parseInt(size[1], 10)
              };



              if(figureEl.children.length > 1) {
                  // <figcaption> content
                  item.title = figureEl.children[1].innerHTML; 
              }

              if(linkEl.children.length > 0) {
                  // <img> thumbnail element, retrieving thumbnail url
                  item.msrc = linkEl.children[0].getAttribute('src');
              } 

              item.el = figureEl; // save link to element for getThumbBoundsFn
              items.push(item);
          }

          return items;
      };

      // find nearest parent element
      var closest = function closest(el, fn) {
          return el && ( fn(el) ? el : closest(el.parentNode, fn) );
      };

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function(e) {
          e = e || window.event;
          e.preventDefault ? e.preventDefault() : e.returnValue = false;

          var eTarget = e.target || e.srcElement;

          // find root element of slide
          var clickedListItem = closest(eTarget, function(el) {
              return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
          });

          if(!clickedListItem) {
              return;
          }

          // find index of clicked item by looping through all child nodes
          // alternatively, you may define index via data- attribute
          var clickedGallery = clickedListItem.parentNode,
              childNodes = clickedListItem.parentNode.childNodes,
              numChildNodes = childNodes.length,
              nodeIndex = 0,
              index;

          for (var i = 0; i < numChildNodes; i++) {
              if(childNodes[i].nodeType !== 1) { 
                  continue; 
              }

              if(childNodes[i] === clickedListItem) {
                  index = nodeIndex;
                  break;
              }
              nodeIndex++;
          }



          if(index >= 0) {
              // open PhotoSwipe if valid index found
              openPhotoSwipe( index, clickedGallery );
          }
          return false;
      };

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function() {
          var hash = window.location.hash.substring(1),
          params = {};

          if(hash.length < 5) {
              return params;
          }

          var vars = hash.split('&');
          for (var i = 0; i < vars.length; i++) {
              if(!vars[i]) {
                  continue;
              }
              var pair = vars[i].split('=');  
              if(pair.length < 2) {
                  continue;
              }           
              params[pair[0]] = pair[1];
          }

          if(params.gid) {
              params.gid = parseInt(params.gid, 10);
          }

          return params;
      };

      var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
          var pswpElement = document.querySelectorAll('.pswp')[0],
              gallery,
              options,
              items;

          items = parseThumbnailElements(galleryElement);

          // define options (if needed)
          options = {

              // define gallery index (for URL)
              galleryUID: galleryElement.getAttribute('data-pswp-uid'),

              getThumbBoundsFn: function(index) {
                  // See Options -> getThumbBoundsFn section of documentation for more info
                  var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                      pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                      rect = thumbnail.getBoundingClientRect(); 

                  return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
              }

          };

          // PhotoSwipe opened from URL
          if(fromURL) {
              if(options.galleryPIDs) {
                  // parse real index when custom PIDs are used 
                  // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                  for(var j = 0; j < items.length; j++) {
                      if(items[j].pid == index) {
                          options.index = j;
                          break;
                      }
                  }
              } else {
                  // in URL indexes start from 1
                  options.index = parseInt(index, 10) - 1;
              }
          } else {
              options.index = parseInt(index, 10);
          }

          // exit if index not found
          if( isNaN(options.index) ) {
              return;
          }

          if(disableAnimation) {
              options.showAnimationDuration = 0;
          }

          // Pass data to PhotoSwipe and initialize it
          gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
          gallery.init();
      };

      // loop through all gallery elements and bind events
      var galleryElements = document.querySelectorAll( gallerySelector );

      for(var i = 0, l = galleryElements.length; i < l; i++) {
          galleryElements[i].setAttribute('data-pswp-uid', i+1);
          galleryElements[i].onclick = onThumbnailsClick;
      }

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      var hashData = photoswipeParseHash();
      if(hashData.pid && hashData.gid) {
          openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
      }
  };
  // execute above function
  initPhotoSwipeFromDOM('.my-gallery');

});


