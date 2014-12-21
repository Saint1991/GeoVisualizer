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


	

	//Definitions of Controller
	var fileListController = fileListModule.controller('filelistController', ['$scope', 'modal', 'FileManager', 'TrajectoryFileFactory', 'OpltFileParser', function($scope, modal, FileManager, TrajectoryFileFactory, OpltFileParser) {
		
		//Init FileManager Object with scope
		var fileManager = FileManager;


		$scope.name = 'fileListController';

		//Define FileList Object
		$scope.fileList = fileManager.fileList;

		//this event listener is called when files are loaded
		$scope.filelistChanged = function($event, files) {

			var totalSize = 0;
			var progress = 0;
			for (var i = 0; i < files.length; i++) {
				totalSize += files[i].size;
			}

			//Start Loading FIles
			for (var i = 0; i < files.length; i++) {				

				var reader = new FileReader();
				(function(file, reader) {

					reader.onloadstart = function() {
						modal.progressBar.start();
					};

					reader.onprogress = function(progressEvent) {
						progress += Math.ceil(progressEvent.loaded / totalSize * 100);
						modal.progressBar.setProgress(progress);
					};

					//Add Event Handler which is called when File Loading failed
					reader.onerror = function(e) {
						console.error(e);
					};

					//Add Event Handler which is called When Complete File Loading
					reader.onload = function(e) {
						
						var data = OpltFileParser.parse(reader.result);
						if (reader.readyState !== FileReader.DONE || data.length === 0) {
							return;
						}

						var trajectoryFile = TrajectoryFileFactory(file.name, data, file.size);
						fileManager.push(trajectoryFile);
						$scope.$apply();
						$scope.$emit('FileListChanged');
					}	

					reader.readAsText(files[i], 'UTF-8');

				})(files[i], reader);
				
			}

		};

	}]);

})();