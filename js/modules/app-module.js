'use strict';

(function() {

	var appModule = angular.module('geovisualizer');

	appModule.controller('appController', ['$scope', 'TrajectoryFileManager', 'MapFileManager', 'ColorGenerator', function($scope, TrajectoryFileManager, MapFileManager, ColorGenerator) {

		var indexes;

		//This is called when Slider Value is Changed
		$scope.$on('PlaySliderValueChanged', function(event, sliderValue) {
			
			if (!indexes || typeof(sliderValue) === 'undefined' || indexes.length === 0) {
				return;
			}

			var key = indexes[sliderValue];
			var data = TrajectoryFileManager.get(key);
			console.assert(data, 'Invalid key');
			var isFirst = sliderValue === 0;
			$scope.$broadcast('dataBroadcast', {'data': data, 'isFirst': isFirst, 'label': key});
		});

		//This is called when loaded fileList is Changed
		$scope.$on('TrajectoryFileListChanged', function(event) {
			
			ColorGenerator.init();
			var markerColors = [];
			var fileNum = TrajectoryFileManager.getLength();
			for (var id = 0; id < fileNum; id++) {
				var color = ColorGenerator.getColor();
				TrajectoryFileManager.setColor(id, color);
				markerColors.push(color);
			}
			$scope.$broadcast('initMarkers', markerColors);

			indexes = TrajectoryFileManager.getIndexes();			
			$scope.$broadcast('initSlider', indexes.length - 1);
		});

		$scope.$on('MapFileListChanged', function(event) {
			
			MapFileManager.fileList.forEach(function(mapFile) {
				var temp = mapFile.name.split('.');
				var type = temp[temp.length - 1];
				$scope.$broadcast('showMapComponent', {'data': mapFile.data, 'type': type});
			});
		});
	}]);
})();