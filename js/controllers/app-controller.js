'use strict';

(function() {

	var appModule = angular.module('geovisualizer');

	appModule.controller('appController', ['$scope', 'FileManager', 'Marker', 'MarkerManager', function($scope, FileManager, Marker, MarkerManager) {

		var indexes;
		var controller = this;

		//This is called when Slider Value is Changed
		$scope.$on('PlaySliderValueChanged', function(event, sliderValue) {
			
			if (!indexes) {
				return;
			}

			var key = indexes[sliderValue];
			var data = FileManager.get(key);
			if (!data) {
				console.error('Invalid key value');
				return;
			}

			var isFirst = sliderValue === 0;
			$scope.$broadcast('dataBroadcast', {'data': data, 'isFirst': isFirst, 'date': key});
		});

		//This is called when loaded fileList is Changed
		$scope.$on('FileListChanged', function(event) {
			
			var fileNum = FileManager.getLength();
			$scope.$broadcast('initMarkers', fileNum);

			indexes = FileManager.getIndexes();			
			$scope.$broadcast('initSlider', indexes.length - 1);
		});
	}]);
})();