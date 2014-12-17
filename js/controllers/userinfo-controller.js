'use strict';

(function() {
	
	var userInfoModule = angular.module('saint.userinfo');
	userInfoModule.controller('userinfoController', ['$scope', '$cookies', '$cookieStore', function($scope, $cookies, $cookieStore) {

		var user = $cookieStore.get('user');
		if(!user) {
			$scope.username='guest';
			return;
		}

		$scope.username = !user.userName ? 'guest' : user.userName;
		$scope.userImageURL = user.image;
	}]);
	
})();