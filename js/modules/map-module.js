'use strict';

(function() {

	var mapModule = angular.module('saint.googlemap');
	var map = null;

	//Definition of  google-map Directive.
	//To display google Map in any elements you can use this directive as an "google-map" attribute
	mapModule.directive('googleMap', ['$compile',   function($compile) {

		var googleMapDirective = {

			restrict: 'A',
			scope: {
				center: '@center',
				zoom: '&zoom',
				showMapInfo: '=showMapInfo'
			},
			controller: ['$scope', '$timeout', 'MarkerManager', 'Marker', function($scope, $timeout, MarkerManager, Marker) {

				//Associative Array of Definitions of DOMEventHandlers
				$scope.domEventList = {

				};

				//Associative Array of Definitions of mapEventHandlers
				$scope.mapEventList = {
					
					mousemove: function(event) {
						
						var latitude = event.latLng.lat().toFixed(4);
						var longitude = event.latLng.lng().toFixed(4);

						$scope.mousePoint = {'latitude': latitude, 'longitude': longitude};
						$scope.$apply();
					},

					center_changed: function() {
						
						var center = this.getCenter();

						var latitude = center.lat().toFixed(4);
						var longitude = center.lng().toFixed(4);

						$scope.center = {'latitude': latitude, 'longitude': longitude};
						$timeout(function() {
							$scope.$apply();
						});
					},

					zoom_changed: function() {
						$scope.zoom = this.getZoom();
						$timeout(function() {
							$scope.$apply();
						});
					}
				};

				//mouse point for information
				$scope.mousePoint = {'latitude': 0, 'longitude': 0};
				
				//map center point
				$scope.center = {'latitude': 0.0000, 'longitude': 0.0000};

				//zoom level Information
				$scope.zoom = -1;

				//pan center to disignated position
				var moveTo = function(latitude, longitude) {
					if (map) {
						
						if (latitude instanceof google.maps.LatLng) {
							map.setCenter(latitude);
							return;
						}

						var center = new google.maps.LatLng(latitude, longitude);
						map.setCenter(center);
					}
				};

		
				var fitBounds = function(topLeft, bottomRight) {
					if (map) {
						map.fitBounds(topLeft, bottomRight);
					}
				};

				var zoomTo = function(level) {
					if (map) {
						map.setZoom(level);
					}
				};

				//Init Markers
				$scope.$on('initMarkers', function(event, markerColors) {
					
					MarkerManager.init();
					for (var id = 0; id < markerColors.length; id++) {
						var color = markerColors[id];
						MarkerManager.add(new Marker(color));
					}
				});


		
				//behavior when receive the data
				$scope.$on('dataBroadcast', function(event, receive) {
					
					var data = receive.data;
					console.assert(data, 'data is empty');

					for (var id = 0; id < data.length; id++) {
						
						var entry = data[id];
						if (entry.isAlive) {

							if (!entry.data) {
								continue;
							}
							
							var position = new google.maps.LatLng(entry.data.latitude, entry.data.longitude);

							if (id === 0 && receive.isFirst) {
								moveTo(position);
								zoomTo(16);
							}

							switch (entry.type) {
								case 'plt':
								case 'oplt':
									MarkerManager.setPosition(id, position);
									MarkerManager.show(id);
									break;
								case 'st':
									var hashInfo = {
										'category': entry.data.categoryName,
										'name': entry.data.venueName
									};
									MarkerManager.setSimpleInfoWindow(id, hashInfo);
									MarkerManager.setEventListener(id, 'setPosition', function(marker) {
										if (marker.infoWindow) {
											google.maps.event.addListener(marker, 'click', function() {
												marker.infoWindow.open(marker.getMap(), marker);
											});
											marker.infoWindow.open(marker.getMap(), marker);
										}
									});
									MarkerManager.setPosition(id, position);
									MarkerManager.show(id);
									break;

								default:
									MarkerManager.setPosition(id, position);
									MarkerManager.show(id);
									break;
							}

						} else {
							MarkerManager.hide(id);
						}
					}

				});


			}],
			compile: function(bindElement, mapAttrs) {

				var center = angular.fromJson(mapAttrs.center);
				var zoom = angular.fromJson(mapAttrs.zoom);

				console.assert(center[0] && center[1] && -90 <= center[0] && center[0] <= 90 && -180 <= center[1] && center[1] <= 180, 'Invalid Center LatLng');
				console.assert(zoom && 0 <= zoom, 'Invalid zoom'); 
				
				//When bindedElement Compiled, google Map is loaded in it.
				var mapElement = bindElement[0];
				mapElement.style.width = '100%';
				mapElement.style.height = '100%';
				map = new google.maps.Map(mapElement, {
					center: new google.maps.LatLng(center[0], center[1]),
	                			mapTypeId: google.maps.MapTypeId.ROADMAP,
	                			zoom: zoom
				});

				//Link Function
				return function($scope, element, attrs ) {

					//Initialize the scope value
					var center = map.getCenter();
					var latitude = center.lat().toFixed(4);
					var longitude = center.lng().toFixed(4);
					$scope.center = {'latitude': latitude, 'longitude': longitude};
					$scope.zoom = map.getZoom();

					//Add MapInformationWindow if showmapinfo attribute value is 'true'
					var showInfoWindow = $scope['showMapInfo'];
					if (showInfoWindow) {

						var mapInformationDiv = document.createElement('div');
						mapInformationDiv.style.width = '300px';
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



	//Definitions of map Components
	mapModule.factory('Marker', [function() {

		var Marker = function(markerColor, position) {
			
			if (typeof(markerColor) === 'undefined') {
				markerColor = 'Blue';
			}

			var markerOptions = {
				map: map,
				icon: {
					path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
					fillColor: markerColor,
					fillOpacity: 1,
					strokeColor: 'black',
					scale: 5,
					strokeWeight: 1
				}
			};

			if (position && position instanceof google.maps.LatLng) {
				markerOptions.position = position;
			}

			var marker = new google.maps.Marker(markerOptions);
			marker.eventList = {};
			marker.infoWindow = null;
			return marker;
		};

		return Marker;
	}]);

	mapModule.factory('SimpleInfoWindow', [function(){
		
		var SimpleInfoWindow = function(hashInfo) {
			
			if (!(hashInfo instanceof Object)) {
				return null;
			}

			var infoDiv = document.createElement('div');
			infoDiv.style.width = '230px';
			for (var key in hashInfo) {
				var lineDiv = document.createElement('div');
				lineDiv.style.textAlign = 'left';
				lineDiv.textContent = key + ': ' + hashInfo[key];
				infoDiv.appendChild(lineDiv);
			}

			var infoWindow = new google.maps.InfoWindow({
				maxWidth: 300,
				pixelOffset: new google.maps.Size(0, 5),
				content: infoDiv
			});

			return infoWindow;
		};

		return SimpleInfoWindow;	
	}]);

	//Definition of MarkerManager which manages markers
	mapModule.service('MarkerManager', ['SimpleInfoWindow', function(SimpleInfoWindow) {

		var markerList = [];

		this.init = function() {
			for (var i = 0; i < markerList.length; i++) {
				markerList[i].setMap(null);
				delete markerList[i];
			}
			markerList = [];
		};

		this.setEventListener = function(id, eventName, callback) {
			var marker = markerList[id];
			if (!marker) {
				console.error('Invalid Marker ID');
				return;
			}
			marker.eventList[eventName] = callback;
		};

		this.removeEventListener = function(id, eventName) {
			var marker = markerList[id];
			if (!marker) {
				console.error('Invalid Marker ID');
				return;
			}

			if (typeof(eventName) === 'string' && eventName in marker.eventList) {
				delete marker.eventList[eventName];
			}
		};

		this.clearEventListeners = function(id) {
			var marker = markerList[id];
			if (!marker) {
				console.error('Invalid Marker ID');
				return;
			}
			marker.eventList = [];
		};

		this.setPosition = function(id, position) {
			
			var methodName =  'setPosition';

			var marker = markerList[id];
			if (!marker) {
				console.log('Invalid Marker ID');
				return;
			}

			if (!(position instanceof google.maps.LatLng)) {
				console.error('position is not instance of google.maps.LatLng');
				return;
			}

			marker.setPosition(position);
			if (methodName in marker.eventList) {
				var callback = marker.eventList[methodName];
				callback(marker);
			}
			
		};

		

		this.show = function(id) {

			var methodName = 'show';

			var marker = markerList[id];
			if (!marker) {
				console.error('Invalid Marker ID');
				return;
			}

			marker.setMap(map);
			if (methodName in marker.eventList) {
				marker.eventList[methodName](marker);
			}
		};

		this.setSimpleInfoWindow = function(id, hashInfo) {

			var marker = markerList[id];
			if (!marker) {
				console.error('Invalid Marker ID');
				return;
			}

			if (marker.infoWindow) {
				marker.infoWindow.open();
				marker.infoWindow.close();
				marker.infoWindow = null;
			}

			marker.infoWindow = new SimpleInfoWindow(hashInfo);
		};

		this.hide = function(id) {
			var marker = markerList[id];
			if (!marker) {
				console.error('Invalid marker ID');
				return;
			}
			marker.setMap(null);
		};

		this.remove = function(id) {
			var marker = markerList[id];
			if (!marker) {
				console.error('Invalid marker ID');
				return;
			}
			marker.eventList = [];
			markerList.splice(id, 1);
			marker.setMap(null);
		};

		this.add = function(marker) {
			var index = markerList.indexOf(marker);
			if (index === -1) {
				markerList.push(marker);
			} else {
				markerList[index] = marker;
			}
		};

	}]);

	//Definition of mapController
	var mapController = mapModule.controller('mapController', ['$scope', function($scope) {

		
	}]);

})();