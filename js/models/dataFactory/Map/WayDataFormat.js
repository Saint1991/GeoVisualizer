'use strict';

(function() {
	
	var modelModule = angular.module('geovisualizer.models');
	modelModule.factory('WayDataFormat', function() {

		var WayDataFormat = function(pointList) {

			if (pointList.length) {
				throw 'pointList is not array';
			}

			pointList.forEach(function(ll) {
				console.assert(!(ll instanceof google.maps.LatLng), 'pointList includes not LatLng Object');
			});

			this.pointSequence = pointList;
		}

		return WayDataFormat;
	});
})();