 /**
 * @author Charlie Calvert
 */

 /* jshint devel: true */

angular.module('elfPlayer', ['elfGameMod'])
.factory('gameEventService', function($rootScope) { 'use strict';
	return {
		message: "",

		towerBroadcast: function(message) {
			this.message = message;
			this.broadcastMessage('towerBroadcast');
			return true;
		},

		debugBroadcast: function(message) {
			this.message = message;
			this.broadcastMessage('debugBroadcast');
			return true;
		},

		encounterBroadcast: function(message) {
			this.message = message;
			this.broadcastMessage('encounterBroadcast');
		},

		changeDirectionBroadcast: function(message) {
			this.message = message;
			this.broadcastMessage('changeDirectionBroadcast');
			return true;
		},

		broadcastMessage: function(broadcastType) {
			$rootScope.$broadcast(broadcastType);
		}
	};
})
.controller('ElfController', function($scope, gameEventService, elfGameService) { 'use strict';

//	$http.get('data.json')
//		.success(function(data, status, headers, config)  {
//			$scope.name = data.name;
//			$scope.armorClass = data.armorClass;
//			$scope.hitPoints = data.hitPoints;
//			$scope.damage = data.damage;
//		})
//		.error(function(data, status, headers, config) {
//			throw new Error('Oh no! An Error!');
//		});

	$scope.name = "Imperial Default Cruiser";
	$scope.armorClass = 10;
	$scope.hitPoints = 20;
	$scope.damage = 0;
	$scope.eventNote = "no messages";
	$scope.crazyFoo = "";
	$scope.debugMessages = [];
	$scope.moveMessages = [];
	
	elfGameService.start();

	// This event is fired from inside crafty when a tower is found.
	// We need to call $apply because we are calling from Crafty, not from Angular.
	$scope.$on('towerBroadcast', function() {		
		$scope.$apply(function() { $scope.eventNote = gameEventService.message; });		
	});

	$scope.$on('debugBroadcast', function() {		
		$scope.$apply(function() { $scope.debugMessages.unshift(gameEventService.message); });		
	});

	$scope.$on('changeDirectionBroadcast', function() {
		$scope.eventNote = gameEventService.message;
		$scope.$apply(function() { $scope.moveMessages.unshift(gameEventService.message); });	
	});

	$scope.$on('encounterBroadcast', function() {		
		$scope.$apply(function() { $scope.encounterMessage = gameEventService.message; });		
	});

});
