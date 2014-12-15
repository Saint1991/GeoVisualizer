'use strict';

(function() {
	
	var modelModule = angular.module('geovisualizer.models');
	
	modelModule.value('geoData', function() {
		return {
			geoData: [],
			
			add: function() {

			},

			remove: function() {

			}
		};
	});

	modelModule.value('fileList', []);
	
})();