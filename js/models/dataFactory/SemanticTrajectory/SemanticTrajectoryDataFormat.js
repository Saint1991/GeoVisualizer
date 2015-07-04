'use strict';

(function() {
	
	//Definition of SemanticTrajectory Data Model
	var modelModule = angular.module('geovisualizer.models');
	modelModule.factory('SemanticTrajectoryDataFormat', function() {

		var SemanticTrajectoryDataFormat = function(latitude, longitude, timestamp, venueName, categoryName) {
			
			if (typeof(latitude) !== 'number'  || typeof(longitude) !== 'number') {
				throw 'Invalid LatLng property';
			}

			if ( !(timestamp instanceof Date) ) {
				throw 'timestamp is not instance of Date';
			}

			if (typeof(venuName) !== 'string') {
				throw 'venueName is not string';
			}

			if (typeof(categoryName) !== 'string') {
				throw 'categoryName is not string';
			}

			console.assert(-90 <= latitude && latitude <= 90, 'latitude is not within [-90, 90]');
			console.assert(-180 <= longitude && longitude <= 180, 'longitude is not within [-180, 180]');
		
			this.latitude = latitude;
			this.longitude = longitude;
			this.timestamp = timestamp;
			this.venueName = venueName;
			this.categoryName = categoryName;
		};
	});
})();