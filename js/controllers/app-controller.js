'use strict';

(function() {

	var appModule = angular.module('geovisualizer');

	appModule.controller('appController', ['$scope', function($scope) {
		$scope.datas = [];
	}]);
})();