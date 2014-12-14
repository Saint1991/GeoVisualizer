'use strict';

(function() {

	//Definition of GeoLife Data Model
	var modelModule = angular.module('geovisualizer.models');
	modelModule.factory('GeoLifeDataFormat', function() {

		var GeoLifeDataFormat = function(latitude, longitude, timestamp, poi) {

			if (typeof(latitude) !== 'number'  || typeof(longitude) !== 'number') {
				throw 'Invalid geo point property;'
			}

			if (latitude < -90 || 90 < latitude) {
				console.log('latitude is not in range of [-90, 90]');
			}

			if (longitude < -180 || 180 < longitude) {
				console.log('longitude is not in range of [-180, 180] ');
			}

			if ( !(timestamp instanceof Date) ) {
				throw 'timestamp is not instance of Date';
			}

			this.latitude = latitude;
			this.longitude = longitude;
			this.timestamp = timestamp;
			this.poi = poi;
		};

		var GeoLifeDataFormatFactory = function(latitude, longitude, timestamp, poi) {
			
			if (!poi) {
				poi = 'none';
			}

			return new GeoLifeDataFormat(latitude, longitude, timestamp, poi);
		};

		return GeoLifeDataFormatFactory;
	});
})();
