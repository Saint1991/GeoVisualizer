'use strict';

(function() {
	
	var mapModule = angular.module('geovisualizer.map');

	//Definition of Directive
	mapModule.directive('googleMap', function() {

		var directiveConfig = {

			restrict: 'A',
			scope: false,
			compile: function(bindElement, mapAttrs) {

				var mapElement = bindElement[0];
				var map = new google.maps.Map(mapElement, {
					center: new google.maps.LatLng(34.82, 135.524),
	                			mapTypeId: google.maps.MapTypeId.ROADMAP,
	                			zoom: 15
				});

				return function(scope, element, attrs, controller, transclude ) {

				}

			}
		};

		return directiveConfig;
	});

	var mapController = mapModule.controller('mapController', ['$scope', function($scope) {
		
		$scope.latitude = 0;
		$scope.longitude = 0;

		$scope.moveTo = function (point) {
			$scope.latitude = point.latitude;
			$scope.longitude = point.longitude;
		};
	}]);
})();