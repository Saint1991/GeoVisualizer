'use strict';

(function() {
	
	var fileListModule = angular.module('geovisualizer.filelist');

	//Check  the availability of File API
	if ( !(window.File && window.FileReader && window.FileList) ) {
		alert("File API is not available on this browser");
		return;
	}


	fileListModule.directive('fileList', [function() {

		var filelistDirective = {

			restrict: 'E',
			scope: false,
			templateUrl: './views/filelist.html',
			link: function($scope, element, attr) {

				if (!$scope.name || $scope.name !== 'fileListController') {
					console.error('fileListController is not bound');
				}
			}
		};

		return filelistDirective;
	}]);


	fileListModule.directive('ngAccept', function() {
		
		var ngAccept = {
			restrict: 'A',
			scope: false,
			link: function($scope, element, attr) {
				
				if (!attr.ngAccept) {
					return;
				}

				var accept = '';
				var validate = /(((\.[a-z]+)|([a-z]+\/[a-z]+))(,(\s)?)?)*((\.[a-z]+)|([a-z]+\/[a-z]+))/;
				if (validate.test(attr.ngAccept)) {
					accept = attr.ngAccept
				} else {
					
					var temp = $scope[attr.ngAccept];	
					if ($.isArray(temp)) {
						
						var str = '';
						for (var i = 0; i < temp.length; i++) {
							str += temp[i] + ', ';
						}
						accept = str.substring(0, str.length - 2);

					} else {
						accept = temp;
					}
					
					if (!validate.test(accept)) {
						console.error('Invalid accept value');
						return;
					}
				}

				element.attr('accept', accept);
			}
		};

		return ngAccept;
		
	});

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
					console.error('element not found');
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
	var fileListController = fileListModule.controller('filelistController', ['$scope', 'modal', 'FileManager', 'TrajectoryFileFactory', 'FileParser', 'ContextMenuService', function($scope, modal, FileManager, TrajectoryFileFactory, FileParser, ContextMenuService) {
		
		//Init FileManager Object with scope
		var fileManager = FileManager;


		$scope.name = 'fileListController';

		//Define FileList Object
		$scope.fileList = fileManager.fileList;

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

			FileManager.remove(fileName, fileSize);
			$scope.$emit('FileListChanged');
		};

		//this event listener is called when files are loaded
		$scope.filelistChanged = function($event, files) {

			var totalSize = 0;
			var loadedSize = 0;
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
						progress += Math.ceil(progressEvent.loaded / totalSize * 50);
						modal.progressBar.setProgress(progress);
					};

					//Add Event Handler which is called when File Loading failed
					reader.onerror = function(e) {
						console.error(e);
					};

					//Add Event Handler which is called When Complete File Loading
					reader.onload = function(e) {

						//File Extension
						var tempArray = file.name.split('.');
						var ext = tempArray[tempArray.length - 1].toLowerCase();
						
						var data = FileParser.parse(reader.result, ext);

						var trajectoryFile = TrajectoryFileFactory(file.name, data, file.size);
						fileManager.push(trajectoryFile);
						
						loadedSize += file.size;

						progress += Math.ceil(file.size / totalSize * 50);
						modal.progressBar.setProgress(progress);

						if (totalSize === loadedSize) {
							$scope.$emit('FileListChanged');
							$scope.$apply();
						}

					};	

					reader.readAsText(files[i], 'UTF-8');

				})(files[i], reader);
				
			}

		};

	}]);

})();