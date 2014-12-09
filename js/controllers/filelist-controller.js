'use strict';

(function() {
	
	var fileListModule = angular.module('geovisualizer.filelist');

	//Check  the availability of File API
	if ( !(window.File && window.FileReader && window.FileList) ) {
		alert("File API is not available on this browser");
		return;
	}

	fileListModule.controller('filelistController', ['$scope', function($scope) {
		
		//this is  a filel list loaded so far
		$scope.fileList = ['test'];

		//this is an array that receive the change of input type="file"
		$scope.selectedFiles = [];

		//this event listener is called when files are loaded
		$scope.filelistChanged = function($event) {
			console.log($event);
		};

		$scope.test="loaded";
	}]);


})();