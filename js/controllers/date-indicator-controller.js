'use strict';

(function() {
	
	var dateIndicatorModule = angular.module('saint.dateindicator');
	dateIndicatorModule.controller('dateIndicatorController', ['$scope', function($scope) {

		$scope.date = '';
		$scope.$on('dataBroadcast', function(event, receive) {
			var date = new Date(receive.date);
			$scope.date = date.toLocaleString('ja-JP');
		});

	}]);

})();