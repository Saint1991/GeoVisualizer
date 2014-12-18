'use strict';

(function() {
	
	var filterModule = angular.module('saint.filters');

	filterModule.filter('naturalNumber', function() {

		var naturalNumberFilter = function(value) {

			if (value < 1) {
				return 1;
			}

			return Math.floor(value);
		};

		return naturalNumberFilter;
	});

})();