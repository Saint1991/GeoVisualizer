'use strict';

(function() {

	angular.module('geovisualizer', [
		'saint.googlemap',
		'geovisualizer.filelist',
		'geovisualizer.models',
		'saint.userinfo'
	]);

	
	angular.module('geovisualizer.filelist', ['geovisualizer.fileparse', 'saint.modal','geovisualizer.models']);
	angular.module('saint.googlemap', []);
	
	angular.module('saint.modal', []);
	angular.module('saint.userinfo', ['ngCookies']);
	angular.module('geovisualizer.fileparse', []);
	angular.module('geovisualizer.models', ['uuid4']);
	
	
})();