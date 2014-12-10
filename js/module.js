
(function() {

	angular.module('geovisualizer', [
		'geovisualizer.map',
		'geovisualizer.filelist'
	]);

	angular.module('utils.modal', []);
	angular.module('geovisualizer.map', []);
	angular.module('geovisualizer.filelist', ['utils.modal']);

})();