'use strict';

(function() {
	
	var playSliderModule = angular.module('saint.playslider');

	//Definitions of directives
	playSliderModule.directive('playSlider', ['$compile', function($compile) {

		var playSliderDirective = {

			restrict: 'E',
			scope: false,
			templateUrl: './views/playSlider.html',
			link: function($scope, element, attrs) {

				if (!$scope.name || $scope.name !== 'playSliderController') {
					throw 'playSliderController is not bound';
				}

				var max = 100;
				if ($scope.max) {
					max = $scope.max;
				}

				var slider = element.find('input[type=range]');
				slider.attr('max', max);
			}

		};

		return playSliderDirective;
	}]);

	playSliderModule.controller('playSliderController', ['$scope', function($scope) {

		$scope.name = 'playSliderController';
		
		// bound to slider value
		$scope.value = 0;

		// bound to playSpped text box
		$scope.playSpeed = 1;

		//Flg which shows whether now playing or not
		$scope.isPlaying = false;

		//max value of the slider 
		$scope.max = 10;

		// reset Slider value
		$scope.toZero = function() {
			$scope.value = 0;
		};

		// Playing behavior
		var intervalID = -1;
		$scope.play = function() {

			if (!$scope.isPlaying) {
				
				var interval = 1000 / $scope.playSpeed;
				var playFunc = function() {
					
					if ($scope.max <= $scope.value) {
						$scope.pause();
					}

					$scope.value++;
					$scope.$emit('PlaySliderValueChanged', $scope.value);
					$scope.$apply();
				};

				intervalID = window.setInterval(playFunc, interval);
				$scope.isPlaying = true;
			}
			
		};

		// Pause Behavior
		$scope.pause = function() {
			
			if (intervalID !== -1 && $scope.isPlaying) {
				window.clearInterval(intervalID);
				$scope.isPlaying = false;
				intervalID = -1;
			}
			
		};

		$scope.$watch('playSpeed', function(newValue, oldValue, scope) {
			
			if (newValue < 1 || typeof(newValue) !== 'number') {
				$scope.playSpeed = 1;
			}

			if (10 < newValue) {
				$scope.playSpeed = 10;
			}

			if (scope.isPlaying) {
				scope.pause();
				scope.play();
			}
		});

		$scope.$watch('max', function(newValue, oldValue, scope) {
			if (!scope.isPlaying) {
				$('#slider').attr('max', newValue);
			}
		});
		
	}]);

})();