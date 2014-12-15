'use strict';

(function() {

	angular.module('geovisualizer', [
		'geovisualizer.map',
		'geovisualizer.filelist',
		'geovisualizer.models'
	]);

	
	angular.module('geovisualizer.filelist', ['geovisualizer.fileparse', 'utils.modal','geovisualizer.models']);
	angular.module('geovisualizer.map', []);
	
	angular.module('utils.modal', []);
	angular.module('geovisualizer.fileparse', []);
	angular.module('geovisualizer.models', ['uuid4']);
	
	
})();