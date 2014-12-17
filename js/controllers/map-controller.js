'use strict';

(function() {

	var mapModule = angular.module('saint.googlemap');
	
	//Definition of  google-map Directive.
	//To display google Map in any elements you can use this directive as an "google-map" attribute
	mapModule.directive('googleMap', ['$compile', function($compile) {

		var googleMapDirective = {

			restrict: 'EA',
			scope: false,
			transclude: true,
			compile: function(bindElement, mapAttrs) {

				var center = angular.fromJson(mapAttrs.center);
				var zoom = angular.fromJson(mapAttrs.zoom);
				

				if (!center[0] || !center[1] ||  center[0] < -90 || 90 < center[0] || center[1] < -180 || 180 < center[1]) {
					console.err('Invalid center value');
					center = [0, 0];
				}

				if (!zoom || zoom < 0) {
					console.err('Invalid zoom value');
					zoom = 1;
				}

				//When bindedElement Compiled, google Map is loaded in it.
				var mapElement = bindElement[0];
				var map = new google.maps.Map(mapElement, {
					center: new google.maps.LatLng(center[0], center[1]),
	                			mapTypeId: google.maps.MapTypeId.ROADMAP,
	                			zoom: zoom
				});


				//Link Function
				return function($scope, element, attrs ) {
					
					//Check whether its scope is mapController
					if (!$scope.name || $scope.name !== 'mapController') {
						throw "mapController is not binded";
					}

					//Initialize the scope value
					var center = map.getCenter();
					var latitude = center.k.toFixed(4);
					var longitude = center.D.toFixed(4);
					$scope.center = {'latitude': latitude, 'longitude': longitude};
					$scope.zoom = map.getZoom();

					//Add MapInformationWindow if showmapinfo attribute value is 'true'
					var showInfoWindow = attrs.showmapinfo === 'true';
					if (showInfoWindow) {

						var mapInformationDiv = document.createElement('div');
						mapInformationDiv.style.width = '240px'
						mapInformationDiv.style.height = '50px';
						mapInformationDiv.style.border = 'solid 3px rgba(32, 255, 26, 1)';
						mapInformationDiv.style.fontSize = '1em';
						mapInformationDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
						mapInformationDiv.style.margin = '5px';
						mapInformationDiv.style.padding = '3px';
						mapInformationDiv.index = 1;

						var width = '100%';
						var height = '33.3%';
						var overflow = 'hidden';
						var textAlign = 'right';

						var mousePointDiv = document.createElement('div');
						mousePointDiv.style.width = width;
						mousePointDiv.style.height = height;
						mousePointDiv.style.overflow = overflow;
						mousePointDiv.style.textAlign = textAlign;
						mousePointDiv.textContent = 'mouse: (lat, lng) = ({{mousePoint.latitude}}, {{mousePoint.longitude}})';

						var centerPointDiv = document.createElement('div');
						centerPointDiv.style.width = width;
						centerPointDiv.style.height = height;
						centerPointDiv.style.overflow = overflow;
						centerPointDiv.style.textAlign = textAlign;
						centerPointDiv.textContent = 'center: (lat, lng) = ({{center.latitude}}, {{center.longitude}})';

						var zoomLevelDiv = document.createElement('div');
						zoomLevelDiv.style.width = width;
						zoomLevelDiv.style.height = height;
						zoomLevelDiv.style.overflow = overflow;
						zoomLevelDiv.style.textAlign = textAlign;
						zoomLevelDiv.textContent = 'zoom: {{zoom}}';

						mapInformationDiv.appendChild(mousePointDiv);
						mapInformationDiv.appendChild(centerPointDiv);
						mapInformationDiv.appendChild(zoomLevelDiv);	

						var linkFunction = $compile(mapInformationDiv);
						var angularMapInformationDiv = linkFunction($scope);


						map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(angularMapInformationDiv[0]);
					}

					//Add DOM EventListeners to the Map
					for (var eventName in $scope.domEventList) {
						var handler = $scope.domEventList[eventName];
						google.maps.event.addDomListener(map, eventName, handler);
					}

					//Add EventListeners to the Map
					for (var eventName in $scope.mapEventList) {
						var handler = $scope.mapEventList[eventName];
						google.maps.event.addListener(map, eventName, handler);
					}

				};

			}
		};

		return googleMapDirective;
	}]);

	

	//Definition of mapController
	var mapController = mapModule.controller('mapController', ['$scope', function($scope) {
		
		//ControllerName
		$scope.name = 'mapController';

		//Associative Array of Definitions of DOMEventHandlers
		$scope.domEventList = {

		};

		//Associative Array of Definitions of mapEventHandlers
		$scope.mapEventList = {
			
			mousemove: function(event) {
				
				var latitude = event.latLng.k.toFixed(4);
				var longitude = event.latLng.D.toFixed(4);

				$scope.mousePoint = {'latitude': latitude, 'longitude': longitude};
				$scope.$apply();
			},

			center_changed: function() {
				
				var center = this.getCenter();

				var latitude = center.k.toFixed(4);
				var longitude = center.D.toFixed(4);

				$scope.center = {'latitude': latitude, 'longitude': longitude};
				$scope.$apply();
			},

			zoom_changed: function() {
				$scope.zoom = this.getZoom();
				$scope.$apply();
			}


		};

		//mouse point for information
		$scope.mousePoint = {'latitude': 0, 'longitude': 0};
		
		//map center point
		$scope.center = {'latitude': 0.0000, 'longitude': 0.0000};

		//zoom level Information
		$scope.zoom = -1;

	}]);

})();