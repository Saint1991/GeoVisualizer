'use strict';

(function() {

	var fileParseModule = angular.module('geovisualizer.fileparser');
	fileParseModule.service('MapFileParser', ['NodeDataFormat', 'WayDataFormat', function(NodeDataFormat, WayDataFormat) {

		var parser = {
			'node': function(textContent) {
				
				var retData = [];

				var lines = textContent.split('\n');
				for (var i = 0; i < lines.length; i++) {

					var lineArray = lines[i].split(',');
					if (lineArray.length < 2) continue;

					var latitude = parseFloat(lineArray[0]);
					var longitude = parseFloat(lineArray[1]);
					var name = lineArray[2];

					var entry = new NodeDataFormat(name, latitude, longitude);
					retData.push(entry);
				}

				return retData;
			},

			'way': function(textContent) {
				
				var retData =[];

				return retData;
			}
		};

		this.parse = function(textContent, ext) {
			
			var parseFunc = parser[ext];
			if (!parseFunc) {
				alert('Invalid File type');
				return null;
			}

			var retData = parseFunc(textContent);
			return retData;
		};
	}]);
})();