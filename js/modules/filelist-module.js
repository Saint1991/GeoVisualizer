'use strict';

(function() {
	
	var fileListModule = angular.module('geovisualizer.filelist');

	//Check  the availability of File API
	if ( !(window.File && window.FileReader && window.FileList) ) {
		alert("File API is not available on this browser");
		return;
	}

	//<trajectory-file-list>
	fileListModule.directive('trajectoryFileList', ['TrajectoryFileManager', function(TrajectoryFileManager) {
		return {
			restrict: 'E',
			templateUrl: './views/trajectory-filelist.html',
			scope: {
				accept: '@accept'
			},
			controller: ['$scope', 'TrajectoryFileManager', 'ContextMenuService', function($scope, TrajectoryFileManager, ContextMenuService) {
				
				//Define FileList Object
				TrajectoryFileManager.fileList = [];
				$scope.fileList = TrajectoryFileManager.fileList;

				$scope.removeFile = function($event) {
			
					var eventRoot = ContextMenuService.element;
					var target = angular.element(eventRoot);
					var tagName = eventRoot.tagName.toLowerCase();
					if (tagName !== 'li') {
						target = angular.element(target).parent();
					}

					var fileNameDiv = target.find('.fileName');
					var fileSizeDiv = target.find('.fileSize');

					var fileName = fileNameDiv.text();
					var fileSize = parseInt(fileSizeDiv.text());

					TrajectoryFileManager.remove(fileName, fileSize);
					$scope.$emit('TrajectoryFileListChanged');
				};
			}],
			link: function($scope, element, attr) {

				var validate = /(((\.[a-z]+)|([a-z]+\/[a-z]+))(,(\s)?)?)*((\.[a-z]+)|([a-z]+\/[a-z]+))/;
				if ($scope['accept'] && validate.test($scope['accept'])) {
					element.find('input[type=file]').attr('accept', $scope.accept);
					return;
				}
				console.error('Invalid Accept Token');
			}
		};
	}]);

	fileListModule.directive('mapFileList', ['MapFileManager', function(MapFileManager) {
		return {
			restrict: 'E',
			templateUrl: './views/map-component-filelist.html',
			scope: {
				accept: '@accept'
			},
			link: function($scope, element, attr) {
				$scope.fileList = MapFileManager.fileList;
				var validate = /(((\.[a-z]+)|([a-z]+\/[a-z]+))(,(\s)?)?)*((\.[a-z]+)|([a-z]+\/[a-z]+))/;
				if ($scope['accept'] && validate.test($scope['accept'])) {
					element.find('input[type=file]').attr('accept', $scope.accept);
					return;
				}
				console.error('Invalid Accept Token');
			}
		};
	}]);

	//Definitions of Directive
	fileListModule.directive('trajectoryFileChange', [function() {
		return {
			restrict: 'A',
			scope: {},
			link: function ($scope, element, attrs) {
				console.assert(element, 'element not found');
				element.on('change', $scope['filelistChanged']);
			},
			controller: ['$scope', 'TrajectoryFileManager', 'TrajectoryFileParser', 'TrajectoryFile',   function($scope, TrajectoryFileManager, TrajectoryFileParser, TrajectoryFile) {
				
				//this event listener is called when files are loaded
				$scope.filelistChanged = function($event) {

					var files = $event.target.files;
					var totalSize = 0;
					var loadedSize = 0;

					for (var i = 0; i < files.length; i++) {
						totalSize += files[i].size;
					}

					//Start Loading FIles
					for (var i = 0; i < files.length; i++) {				

						var reader = new FileReader();
						(function(file, reader) {
						
							//Add Event Handler which is called when File Loading failed
							reader.onerror = function(e) {
								console.error(e);
							};

							//Add Event Handler which is called When Complete File Loading
							reader.onload = function(e) {

								//File Extension
								var tempArray = file.name.split('.');
								var ext = tempArray[tempArray.length - 1].toLowerCase();
								
								var data = TrajectoryFileParser.parse(reader.result, ext);

								var trajectoryFile = new TrajectoryFile(file.name, data, file.size);
								TrajectoryFileManager.push(trajectoryFile);
								
								loadedSize += file.size;
								if (totalSize === loadedSize) {
									$scope.$emit('TrajectoryFileListChanged');
								}
							};	
							
							reader.readAsText(files[i], 'UTF-8');

						})(files[i], reader);
					}
				};
			}]
		};
	}]);

	fileListModule.directive('mapFileChange', [function() {
		return {
			restrict: 'A',
			scope: {},
			link: function ($scope, element, attrs) {
				console.assert(element, 'element not found');
				element.on('change', $scope['filelistChanged']);
			},
			controller: ['$scope', 'MapFileManager', 'MapFileParser', 'MapFile', function($scope, MapFileManager, MapFileParser, MapFile) {

				MapFileManager.fileList = [];
				$scope.fileList = MapFileManager.fileList;

				$scope.filelistChanged = function($event) {

					var files = $event.target.files;
					var totalSize = 0;
					var loadedSize = 0;

					for (var i = 0; i < files.length; i++) {
						totalSize += files[i].size;
					}

					//Start Loading FIles
					for (var i = 0; i < files.length; i++) {				

						var reader = new FileReader();
						(function(file, reader) {
						
							//Add Event Handler which is called when File Loading failed
							reader.onerror = function(e) {
								console.error(e);
							};

							//Add Event Handler which is called When Complete File Loading
							reader.onload = function(e) {
								//File Extension
								var tempArray = file.name.split('.');
								var ext = tempArray[tempArray.length - 1].toLowerCase();
								var data = MapFileParser.parse(reader.result, ext);

								var mapFile = new MapFile(file.name, data, file.size);
								MapFileManager.push(mapFile);

								loadedSize += file.size;
								if (totalSize === loadedSize) {
									$scope.$emit('MapFileListChanged');
								}
							};

							reader.readAsText(files[i], 'UTF-8');

						})(files[i], reader);
					}

				};
			}]
		};
	}]);


	//Definitions of Controller
	var fileListController = fileListModule.controller('filelistController', ['$scope', function($scope) {
		
	}]);

})();