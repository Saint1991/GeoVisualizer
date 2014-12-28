'use strict';

(function() {

	var appModule = angular.module('geovisualizer');

	appModule.controller('appController', ['$scope', 'FileManager', 'ColorGenerator', function($scope, FileManager, ColorGenerator) {

		var indexes;
		var controller = this;

		//This is called when Slider Value is Changed
		$scope.$on('PlaySliderValueChanged', function(event, sliderValue) {
			
			if (!indexes || typeof(sliderValue) === 'undefined' || indexes.length === 0) {
				return;
			}

			var key = indexes[sliderValue];
			var data = FileManager.get(key);
			if (!data) {
				console.error('Invalid key value');
				return;
			}

			var isFirst = sliderValue === 0;
			$scope.$broadcast('dataBroadcast', {'data': data, 'isFirst': isFirst, 'label': key});
		});

		//This is called when loaded fileList is Changed
		$scope.$on('FileListChanged', function(event) {
			
			ColorGenerator.init();
			var markerColors = [];
			var fileNum = FileManager.getLength();
			for (var id = 0; id < fileNum; id++) {
				var color = ColorGenerator.getColor();
				FileManager.setColor(id, color);
				markerColors.push(color);
			}
			$scope.$broadcast('initMarkers', markerColors);

			indexes = FileManager.getIndexes();			
			$scope.$broadcast('initSlider', indexes.length - 1);
		});
	}]);
})();