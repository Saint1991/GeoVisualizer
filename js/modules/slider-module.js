'use strict';

(function() {
	
	var playSliderModule = angular.module('saint.playslider');

	//Definitions of directives
	playSliderModule.directive('playSlider', ['$compile', function($compile) {

		var playSliderDirective = {

			restrict: 'E',
			scope: {},
			templateUrl: './views/playSlider.html',
			controller: ['$scope', function($scope) {
		
				// bound to slider value
				$scope.value = -1;

				//for silider value label indicator
				$scope.label = '';

				// bound to playSpped text box
				$scope.playSpeed = 1;

				//Flg which shows whether now playing or not
				$scope.isPlaying = false;

				//max value of the slider 
				$scope.max = 10;

				$scope.sliderValueChanged = function($event, newValue) {
					$scope.value = newValue;
				};

				//InitSliderEvent
				$scope.$on('initSlider', function(event, max) {
					var sliderMax = Math.max(max, 0);
					$scope.value = 0;
					$scope.max = sliderMax;
					$scope.$emit('PlaySliderValueChanged', $scope.value);
				});

				//update label Indicator
				$scope.$on('dataBroadcast', function(event, receive) {
					var label = new Date(receive.label);
					$scope.label = label.toLocaleString();
				});

				// reset Slider value
				$scope.toZero = function() {
					$scope.value = 0;
				};

				// Playing behavior
				var intervalID = -1;
				$scope.play = function() {

					if (!$scope.isPlaying) {
						
						var interval = 5000 / $scope.playSpeed;
						var playFunc = function() {
							
							if ($scope.max <= $scope.value) {
								$scope.pause();
								$scope.$apply();
								return;
							}

							$scope.value++;
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
				

			}],
			link: function($scope, element, attrs) {

				var max = 100;
				if ($scope.max) {
					max = $scope.max;
				}

				var slider = element.find('input[type=range]');
				slider.attr('max', max);

				$scope.value = -1;
			}

		};

		return playSliderDirective;
	}]);

	//Event for Angular called when slider value changed
	playSliderModule.directive('sliderValueChanged', ['$parse', function($parse) {

		var sliderValueChangeDef = {
			'restrict': 'A',
			scope: false,
			link: function($scope, element, attrs) {
				
				console.assert(element, 'element not found');

				var sliderValueChanged = attrs['sliderValueChanged'];
				var attrHandler = $parse(sliderValueChanged);
				var handler = function(e) {
					$scope.$apply(function() {
						attrHandler($scope, {$event: e, newValue: e.target.value});
					});
				};

				var el = element[0];
				$(el).on('input', handler);

				$scope.$watch('value', function(newValue, oldValue, scope) {
					element.val(newValue);
					$scope.$emit('PlaySliderValueChanged', newValue);
				});
			}
		};

		return sliderValueChangeDef;
	}]);

	playSliderModule.controller('playSliderController', ['$scope', function($scope) {

		
	}]);

})();