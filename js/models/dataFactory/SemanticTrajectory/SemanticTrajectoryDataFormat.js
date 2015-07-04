'use strict';

(function() {
	
	//Definition of SemanticTrajectory Data Model
	var modelModule = angular.module('geovisualizer.models');
	modelModule.factory('SemanticTrajectoryDataFormat', function() {

		var SemanticTrajectoryDataFormat = function(latitude, longitude, timestamp, venue_name, category_name) {
			
			if (typeof(latitude) !== 'number'  || typeof(longitude) !== 'number') {
				throw 'Invalid LatLng property';
			}

			if ( !(timestamp instanceof Date) ) {
				throw 'timestamp is not instance of Date';
			}

			if (typeof(venu_name) !== 'string') {
				throw 'venue_name is not string';
			}

			if (typeof(category_name) !== 'string') {
				throw 'category_name is not string';
			}

			console.assert(-90 <= latitude && latitude <= 90, 'latitude is not within [-90, 90]');
			console.assert(-180 <= longitude && longitude <= 180, 'longitude is not within [-180, 180]');
		
			this.latitude = latitude;
			this.longitude = longitude;
			this.timestamp = timestamp;
			this.venue_name = venue_name;
			this.category_name = category_name;
		};
	});
})();