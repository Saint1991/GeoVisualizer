'use strict';

(function() {

	var fileParseModule = angular.module('geovisualizer.fileparser');

	fileParseModule.service('OpltFileParser', ['GeoLifeDataFormat', function(GeoLifeDataFormat) {

		this.parse = function(textContent) {
			
			var retData = [];

			var lines = textContent.split('\n');
			for (var i = 0; i < lines.length - 1; i++) {
				
				var lineArray = lines[i].split(',');
				if (lineArray.length !== 4) {
					continue;
				}

				var latitude = parseFloat(lineArray[0]);
				if (latitude !== latitude) {
					console.error('latitude is not a number');
					continue;
				}

				var longitude = parseFloat(lineArray[1]);
				if (longitude !== longitude) {
					console.error('longitude is not a number');
					continue;
				}

				var timestamp = new Date(lineArray[2]);
				var time = timestamp.getTime();
				if (!timestamp) {
					console.error('invalid timestamp');
					continue;
				}

				var poi = lineArray[3];

				var entry = new GeoLifeDataFormat(latitude, longitude, timestamp, poi);
				retData.push(entry);
			}

			return retData;
		};
	}]);
 
})();