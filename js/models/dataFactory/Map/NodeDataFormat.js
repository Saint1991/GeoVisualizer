'use strict';

(function() {
	
	var modelModule  = aungular.module('geovisualizer.models');
	modelModule.factory('NodeDataFormat', function() {

		var NodeDataFormat = function(name, latitude, longitude) {

			if (typeof(latitude) !== 'number'  || typeof(longitude) !== 'number') {
				throw 'Invalid geo point property;'
			}

			if (name && typeof(name) !== 'string') {
				name = '';
				console.log('Name is set but not string');
			}

			this.name = name;
			this.latitude = latitude;
			this.lognitude = longitude;
		};
		
		return NodeDataFormat;
	});
})();