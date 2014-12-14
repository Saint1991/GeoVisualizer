'use strict';

(function() {
	
	var mapModule = angular.module('geovisualizer.map');

	//Definition of Directive
	mapModule.directive('google-map', function() {

		var directiveConfig = {
			compile: function(mapElement, mapAttrs, mapTransclude) {

				//google mapを表示する
				var createMap = function() {
					var mapConfig = {
	         					center: new google.maps.LatLng(34.82, 135.524),
	                				mapTypeId: google.maps.MapTypeId.ROADMAP,
	                				zoom: 15
					};
					var mapCanvas = new google.maps.Map(mapElement, mapConfig);
				};
				
				return createMap;

			}
		};

		return directiveConfig;
	});

	var mapController = mapModule.controller('mapController', ['$scope', function($scope) {



	}]);
})();