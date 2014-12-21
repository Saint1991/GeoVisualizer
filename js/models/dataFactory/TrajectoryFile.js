'use strict';

(function() {

	var modelModule = angular.module('geovisualizer.models');
	modelModule.factory('TrajectoryFileFactory', [function() {

		var find = function(sortedArray, search) {

			var length = sortedArray.length;
			var threshold = 5;	
			var ret = null;

			if (length < threshold) {
				for (var i = 0; i < sortedArray.length; i++) {
					var time = sortedArray[i].timestamp.getTime();
					if (sortedArray[i].timestamp.getTime() === search) {
						return sortedArray[i];
					}
				}
				return null;
			}

			var median = Math.floor(length / 2);
			var medianValue = sortedArray[median].timestamp.getTime();
			if (search < medianValue) {
				ret = find(sortedArray.slice(0, median), search);
			} else if (medianValue < search) {
				ret = find(sortedArray.slice(median + 1, length), search);
			} else {
				return sortedArray[median];
			}

			return ret;
		};

		// sort data in order by timestamp
		var TrajectoryFile = function(name, data, size) {
			
			data.sort(function(a, b) {
				return a.timestamp.getTime() - b.timestamp.getTime();
			});

			this.name = name;
			this.data = data;
			this.size = size;
		};

		TrajectoryFile.prototype.getData = function(timestamp) {
			
			var search = timestamp;
			if (timestamp instanceof Date) {
				search = timestamp.getTime();
			} else if (typeof(timestamp) !== 'number' || timestamp < 0) {
				console.error('tried getData by invalid timestamp');
				return null;
			}

			var geoEntry = find(this.data, search);

			return geoEntry;
		};

		TrajectoryFile.prototype.isWithin = function(timestamp) {
			
			var lastIndex = this.data.length - 1;

			var search = (timestamp instanceof Date) ? timestamp.getTime() : timestamp;
			if (search < this.data[0].timestamp.getTime()) {
				return false;
			}	
			if (this.data[lastIndex].timestamp.getTime() < search) {
				return false;
			}

			return true;
		};

		var TrajectoryFileFactory = function(name, data, size) {
			return new TrajectoryFile(name, data, size);
		};

		return TrajectoryFileFactory;
	}]);

})();