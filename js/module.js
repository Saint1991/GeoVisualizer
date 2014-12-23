'use strict';

(function() {

	angular.module('geovisualizer', [
		'saint.googlemap',
		'geovisualizer.filelist',
		'geovisualizer.models',
		'saint.userinfo',
		'saint.playslider',
		'saint.utils'
	]);

	
	angular.module('geovisualizer.filelist', ['saint.modal', 'geovisualizer.fileparser', 'geovisualizer.models']);
	angular.module('saint.googlemap', []);
	angular.module('saint.playslider', []);

	angular.module('saint.utils', []);
	angular.module('saint.modal', []);
	angular.module('saint.userinfo', ['ngCookies']);
	angular.module('saint.filters', []);
	angular.module('geovisualizer.fileparser', ['geovisualizer.models']);
	angular.module('geovisualizer.models', ['uuid4']);
	
	
})();