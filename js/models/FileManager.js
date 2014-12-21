'use strict';

(function() {
	
	//Definition of FileList
	//Check fileList already have contains the same file but its content itself is not checked
	//this function only checks its name and size
	var modelModule = angular.module('geovisualizer.models');
	modelModule.service('FileManager', [function() {
		
		var indexOf = function(fileList, search) {
			
			for (var i = 0; i < fileList.length; i++) {
				var file = fileList[i];
				if (file.name === search.name && file.size === search.size) {
					return i;
				}
			}

			return -1;
		};


		this.fileList = [];
		
		this.remove = function(target, size) {
				
			if (typeof(target) === 'number') {
				this.fileList.splice(target, 1);
				return;
			} else if (typeof(target) === 'string' && size) {
				var index = indexOf(this.fileList, {'name': target, 'size': size});
				this.fileList.splice(index, 1);
			}
		};

		this.push = function(element) {
				
			if (indexOf(element) === -1) {
				this.fileList.push(element);
			}

		};

		this.getIndexes = function() {
				
			var indexes = [];
			for (var i = 0; i < this.fileList.length; i++) {
					
				var file = this.fileList[i];
				for (var j = 0; j < file.data.length; j++) {
						
					var time = file.data[j].timestamp.getTime();
					if ($.inArray(time, indexes) === -1) {
						indexes.push(time);
					}

				}
			}

			indexes.sort(function(a, b) {
				return a - b;
			});
		
			return indexes;
		};

		this.get = function(timestamp) {
				
			var retData = [];

			if ( !(typeof(timestamp) === 'number' || timestamp instanceof Date)) {
				console.error('timestamp is neither unixTimesamp nor instanceof Data');
				return null;
			}

			for (var i = 0; i < this.fileList.length; i++) {
				var file = this.fileList[i];
				var isAlive = file.isWithin(timestamp);
				var data = file.getData(timestamp);
				retData.push({'isAlive': isAlive, 'data': data});
			}

			return retData;
		};

	}]);
})();
