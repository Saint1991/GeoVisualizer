'use strict';

(function() {
	
	var fileListModule = angular.module('geovisualizer.filelist');

	//Check  the availability of File API
	if ( !(window.File && window.FileReader && window.FileList) ) {
		alert("File API is not available on this browser");
		return;
	}


	//Definitions of Directive
	fileListModule.directive('fileChange', ['$parse', function($parse) {

		var fileChangeDef = {
			restrict: 'A',
			scope: false,
			link: function ($scope, element, attrs) {

				//Check Controller
				if ($scope.name !== 'fileListController') {
					console.error('fileListController is not bound');
				}

				//check bound element
				if (!element) {
					console.error('er');
				}

				var fileChange = attrs['fileChange'];
;				var attrHandler = $parse(fileChange);
				var handler = function(e) {
					$scope.$apply(function() {
						attrHandler($scope, {$event: e, files: e.target.files});
					});
				};

				var el = element[0];
				$(el).on('change', handler);

			}
		};

		return fileChangeDef;
	}]);


	//Definitions of Service
	//fileListModule.value('FileReadService', function())

	
	//Definitions of Controller
	var fileListController = fileListModule.controller('filelistController', ['$scope', 'modal', 'fileList', 'geoData', function($scope, modal, fileList, geoData) {
		
		$scope.name = 'fileListController';

		//this is  a filel list loaded so far
		$scope.fileList = fileList;	

		//this event listener is called when files are loaded
		$scope.filelistChanged = function($event, files) {

			var reader = new FileReader();

			reader.onloadstart = function() {

				modal.progressBar.start();

				for (var i = 0; i < files.length; i++) {

					var file = files[i];

					if ( ($.inArray(file, $scope.fileList)) === -1 ) {
						$scope.fileList.push(file);
					}
				}

				$scope.$apply();
			};

			reader.onprogress = function(progressEvent) {
				var progress =Math.floor(progressEvent.loaded / progressEvent.total * 100);
				modal.progressBar.setProgress(progress);
			};

			//Add Event Handler which is called When Comlete File Loading
			reader.onload = function() {
				console.log(reader.result);
			};

			//Start Loading FIles
			for (var i = 0; i < files.length; i++) {
				reader.readAsText(files[i], 'UTF-8');
			}

		};

	}]);

	//使えるか微妙
	fileListController.controller('progressController', ['$scope', 'modal', function($scope, modal) {
		modal.progressBar.controller($scope, modal);
	}]);

})();