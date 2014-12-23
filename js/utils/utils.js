'use strict';

(function() {
	
	var utilModule = angular.module('saint.utils');
	utilModule.service('ColorGenerator', [function() {

		var iterator = 0;
		var colors = [
			'rgba(32, 255, 26, 1)',
			'Blue',
			'Red',
			'Yellow',
			'Orange',
			'BlueViolet',
			'DeepPink',
			'Aqua',
			'Teal',
			'Maroon',
			'Black',
			'Gray',
			'White',
			'Salmon',
			'PeachPuff',
			'DarkGreen'
		];

		this.getColor = function() {
			
			var color = colors[iterator++];
			if (iterator > colors.length) {
				iterator = 0;
			}

			return color;
		};

		this.init = function() {
			iterator = 0;
		};

	}]);

})();