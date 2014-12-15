'use strict';

(function() {

	var mapModule = angular.module('geovisualizer.map');
	
	//Definition of Directive
	mapModule.directive('googleMap', function() {

		var directiveConfig = {

			restrict: 'A',
			scope: false,
			controller: 'mapController',
			compile: function(bindElement, mapAttrs) {

				var mapElement = bindElement[0];
				var map = new google.maps.Map(mapElement, {
					center: new google.maps.LatLng(34.82, 135.524),
	                			mapTypeId: google.maps.MapTypeId.ROADMAP,
	                			zoom: 15
				});

				return function(scope, element, attrs, controller, transclude ) {
					scope.map = map;
				}

			}
		};

		return directiveConfig;
	});

	var mapController = mapModule.controller('mapController', ['$scope', function($scope) {
		
	}]);
})();