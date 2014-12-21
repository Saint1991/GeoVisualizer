'use strict';

(function() {

	var appModule = angular.module('geovisualizer');

	appModule.controller('appController', ['$scope', 'FileManager', function($scope, FileManager) {

		var indexes;
		var controller = this;

		//This is called when Slider Value is Changed
		$scope.$on('PlaySliderValueChanged', function(event, sliderValue) {
			
			if (!indexes) {
				return;
			}
			console.log(indexes);

			var key = indexes[sliderValue];
			var data = FileManager.get(key);
		});

		//This is called when loaded fileList is Changed
		$scope.$on('FileListChanged', function(event) {
			indexes = FileManager.getIndexes();
			$scope.$broadcast('initSlider', indexes.length - 1);
		});
	}]);
})();