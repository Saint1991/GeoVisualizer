'use strict'

//Definition of GeoLife Data Model
var modelModule = angular.module('geovisualizer.models');
modelModule.factory('GeoLifeDataModel', function() {

	var GeoLifeDataModel = function(latitude, longitude, timestamp, poi) {

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

	var GeoLifeDataModelFactory = function(latitude, longitude, timestamp, poi = 'none') {
		return new GeoLifeDataModel(latitude, longitude, timestamp, poi);
	};

	return GeoLifeDataModelFactory;
}):