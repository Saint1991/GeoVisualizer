'use strict';

(function() {
	
	var modelModule = angular.module('geovisualizer.models');
	modelModule.service('MapFileManager', [function() {

		var indexOf = function(files, search) {
			
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (file.name === search.name && file.size === search.size) {
					return i;
				}
			}

			return -1;
		};

		this.fileList = [];

		this.getLength = function() {
			return this.fileList.length;
		};

		this.remove = function(target, size) {
				
			if (typeof(target) === 'number') {
				this.fileList.splice(target, 1);
				return;
			} else if (typeof(target) === 'string' && size) {
				var index = indexOf(this.fileList, {'name': target, 'size': size});
				if (index !== -1) {
					this.fileList.splice(index, 1);
				}
			}
		};

		this.push = function(element) {
				
			if (indexOf(this.fileList, element) === -1) {
				this.fileList.push(element);
			}

		};

	}]);
})();