'use strict';

(function() {

	var appModule = angular.module('geovisualizer');

	appModule.controller('appController', ['$scope', function($scope) {

		//This is called when Slider Value is Changed
		$scope.$on('PlaySliderValueChanged', function(event, sliderValue) {
			console.log('slider value:' + sliderValue);
		});
	}]);
})();