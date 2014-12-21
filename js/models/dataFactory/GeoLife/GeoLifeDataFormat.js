'use strict';

(function() {

	//Definition of GeoLife Data Model
	var modelModule = angular.module('geovisualizer.models');
	modelModule.factory('GeoLifeDataFormat', function() {

		var GeoLifeDataFormat = function(latitude, longitude, timestamp, poi) {

			if (typeof(latitude) !== 'number'  || typeof(longitude) !== 'number') {
				throw 'Invalid geo point property;'
			}

			if ( !(timestamp instanceof Date) ) {
				throw 'timestamp is not instance of Date';
			}

			console.assert(-90 <= latitude && latitude <= 90, 'latitude is not within [-90, 90]');
			console.assert(-180 <= longitude && longitude <= 180, 'longitude is not within [-180, 180]');

			this.latitude = latitude;
			this.longitude = longitude;
			this.timestamp = timestamp;
			this.poi = !poi ? 'none' : poi;
		};

		return GeoLifeDataFormat;
	});
})();
