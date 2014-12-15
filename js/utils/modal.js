'use strict';

(function() {
	
	var modalModule = angular.module('utils.modal');

	modalModule.factory('modal', ['$compile', function($compile) {

		var modal = (function() {

			var showModalLayer = function(onclick) {

				var $overlay = $('#modal-overlay');
				if ($overlay.length === 0) {
					$overlay = $('<div></div>', {id: 'modal-overlay'});
					if (onclick) {
						$overlay.on('click', onclick);
					}

					var $body = $('body');
					$body.prepend($overlay);
					$body.css('padding', '0px');
				}

				$overlay.fadeIn();
				return $overlay;
			};

			var hideModalLayer = function() {

				var $overlay = $('#modal-overlay');
				if ($overlay.length !== 0) {
					$overlay.fadeOut();
					$overlay.remove();
				}
			};


			var progressBar = (function() {

				var start = function(onclick) {

					var $overlay = showModalLayer(onclick);
					var $progressBar = $(
						'<div id="progress-window">'
						+	'<div id="progress-contents">'
						+		'<div id="progress-bar">'
						+			'<div id="progress-indicator"></div>'
						+		'</div>'
						+		'<div id="progress-label"></div>'
						+	'</div>'	
						+ '</div>'
					);

					$overlay.append($progressBar);
				};

				var end = function() {

					var $progressBar = $('#progress-window');
					if (progressBar.length !== 0) {
						$('#progress-window').remove();
					}

					hideModalLayer();
				};

				var setProgress = function(progress) {

					console.assert(typeof(progress) === 'number', 'Invalid Progress Value');
					if (progress < 0) {
						progress = 0;
					} else if (100 < progress) {
						progress = 100;
					}

					var progressStr = progress + '%';

					var $progressIndicator = $('#progress-indicator');
					$progressIndicator.css('width', progressStr);
					
					var $progressLabel = $('#progress-label');
					$progressLabel.text(progressStr);

					if (progress === 100) {
						end();
					}
				};

				return {'start': start, 'end': end, 'setProgress': setProgress};
			})();

			return {'showModalLayer': showModalLayer, 'hideModalLayer': hideModalLayer, 'progressBar': progressBar};

		})();

		return modal;

	}]);
})();