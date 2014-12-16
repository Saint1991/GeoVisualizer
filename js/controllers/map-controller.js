'use strict';

(function() {

	var mapModule = angular.module('saint.googlemap');
	
	//Definition of  google-map Directive.
	//To display google Map in any elements you can use this directive as an "google-map" attribute
	mapModule.directive('googleMap', function() {

		var googleMapDirective = {

			restrict: 'EA',
			scope: false,
			transclude: true,
			compile: function(bindElement, mapAttrs) {

				var center = angular.fromJson(mapAttrs.center);
				var zoom = angular.fromJson(mapAttrs.zoom);

				if (!center[0] || !center[1] ||  center[0] < -90 || 90 < center[0] || center[1] < -180 || 180 < center[1]) {
					console.err('Invalid center value');
					center = [0, 0];
				}

				if (!zoom || zoom < 0) {
					console.err('Invalid zoom value');
					zoom = 1;
				}

				//When bindedElement Compiled, google Map is loaded in it.
				var mapElement = bindElement[0];
				var map = new google.maps.Map(mapElement, {
					center: new google.maps.LatLng(center[0], center[1]),
	                			mapTypeId: google.maps.MapTypeId.ROADMAP,
	                			zoom: zoom
				});

				//Link Function
				return function($scope, element, attrs ) {
					
					//Check whether its scope is mapController
					if (!$scope.name || $scope.name !== 'mapController') {
						throw "mapController is not binded";
					}

					//Add DOM EventListeners to the Map
					for (var eventName in $scope.domEventList) {
						var handler = $scope.domEventList[eventName];
						google.maps.event.addDomListener(map, eventName, handler);
					}

					//Add EventListeners to the Map
					for (var eventName in $scope.mapEventList) {
						var handler = $scope.mapEventList[eventName];
						google.maps.event.addListener(map, eventName, handler);
					}
					
				};

			}
		};

		return googleMapDirective;
	});

	//Definition of mapController
	var mapController = mapModule.controller('mapController', ['$scope', function($scope) {
		
		//ControllerName
		$scope.name = 'mapController';

		//Associative Array of Definitions of DOMEventHandlers
		$scope.domEventList = {

		};

		//Associative Array of Definitions of mapEventHandlers
		$scope.mapEventList = {
			
			mousemove: function(event) {
				
				var latitude = event.latLng.k.toFixed(4);
				var longitude = event.latLng.D.toFixed(4);

				$scope.mousePoint.latitude = latitude;
				$scope.mousePoint.longitude = longitude;
			
				$('#map-footer').text('(' + latitude + ', ' + longitude + ')');
			}
		};

		//mouse point for information
		$scope.mousePoint = {'latitude': 0.0000, 'longitude': 0.0000};

	}]);

})();