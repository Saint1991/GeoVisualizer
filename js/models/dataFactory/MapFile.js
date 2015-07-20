'use strict';

(function() {

	var modelModule = angular.module('geovisualizer.models');
	modelModule.factory('MapFile', [function() {

		var MapFile = function(name, data, size) {
			this.name = name;
			this.data = data;
			this.size = size;
		};

		return MapFIle;
	}]);

})();