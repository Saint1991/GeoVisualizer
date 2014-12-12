
(function() {

	angular.module('geovisualizer', [
		'geovisualizer.map',
		'geovisualizer.filelist',
		'geovisualizer.models'
	]);

	angular.module('utils.modal', []);
	angular.module('geovisualizer.filelist', ['geovisualizer.fileparse' 'utils.modal']);
	angular.module('geovisualizer.fileparse', ['geovisualizer.models']);
	angular.module('geovisualizer.models', []);
	angular.module('geovisualizer.map', []);
	
})();