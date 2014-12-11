'use strict';

(function() {
	
	var modalModuls = angular.module('utils.module');

	var modal = (function() {

		var showModalLayer = function(color, onclick) {
		
			//Create overlay as a div element
			var overlay = $('<div></div>', {id: 'modal-overlay'});
			
			//style definition
			var rgba = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' color.a + ')';
			overlay.css('position', 'fixed');
			overlay.css('width', '101%');
			overlay.css('height', '101%');
			overlay.css('z-index', '200');
			overlay.css('background-color', rgba);

			//Add Click Event
			overlay.on('click', onclick);
			
			//Add to DOM
			$('body').prepend(overlay);
			overlay.fadeIn();
		};

		var hideModalLayer = function() {
			var overlay = $('#modal-overlay');
			ovarlay.fadeOut();
			overlay.remove();
		};


		//modal.progressbar object
		var progressBar = (function() {

		});

		return {'showModalLayer': showModalLayer, 'hideModalLayer': hideModalLayer};

	})();

	modalModules.value('modal', modal);

})();