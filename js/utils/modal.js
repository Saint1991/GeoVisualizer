'use strict';

(function() {
	
	var modalModuls = angular.module('utils.module');

	//Definition of Service
	var modal = (function() {

		// Create Modal Overlay
		var showModalLayer = function(onclick) {
		
			var overlay = $('#modal-overlay');

			//Create overlay as a div element
			if (overlay.length === 0) {
				overlay = $('<div></div>', {id: 'modal-overlay'});
			
				//Add Click Event
				overlay.on('click', onclick);
				
				//Add to DOM
				var $body = $('body');
				$body.prepend(overlay);
			}
			
			$body.css('padding', '0px');
			overlay.fadeIn();

			return overlay;
		};

		// Hide Overlay
		var hideModalLayer = function() {
			var $overlay = $('#modal-overlay');
			if ($overlay.length > 0) {
				$ovarlay.fadeOut();
				$overlay.remove();
			}
		};


		//modal.progressbar object
		var progressBar = (function() {

			var startProgress = function(color, onclick) {
				
				//Show Overlay
				$overlay = showModalLayer(color, onclick);
				var progressBar = $(
					'<div id="progress-window" ng-controller="progressController">
						<div id="progress-contents">
							<div id="progress-bar">
								<div id="progress-indicator"></div>
							</div>
							<div id="progress-label" ng-bind="progressStr"></div>
						</div>	
					</div>'
				);

				$overlay.append(progressBar);
			};

			var end = function() {
				var progressBar = $('#progress-window');
				if (progressBar.length > 0) {
					$('#progress-window').remove();
				}
				hideModalLayer();
			};

			return {'startProgress': startProgress, 'end': end};

		})();

		return {'showModalLayer': showModalLayer, 'hideModalLayer': hideModalLayer, 'progressBar': progressBar};

	})();

	modalModules.value('modal', modal);


	
	//Definitions of Controller
	modalModule.controller('progressController', ['$scope', 'modal', function($scope, modal) {
		
		$scope.progress = 0;
		$scope.progressStr = '0%';
		$scope.$watch('progress', function(newValue, oldValue, scope) {
			
			var $progressIndicator = $('#progress-indicator');			
			var progressStr = newValue + '%';

			//Update ProgressBar
			if ($progressIndicator.length === 1) {
				$progressIndicator.css('width', progressStr);
			}

			scope.progressStr = progressStr;
			//scope.$apply();

			if (newValue === 100) {
				modal.progressBar.end();
			}

		});
	}]);


})();