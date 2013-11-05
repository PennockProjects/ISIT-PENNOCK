/**
 * @author Charlie Calvert
 */

angular.module('elvenApp', ['tools']);

function BoatController($scope, boat, sailboat) {
	$scope.simple = "Simple Boat";
	$scope.boatType = boat.getDescription();
	$scope.sailBoat = sailboat.getDescription();
	$scope.getNine = function() {
		return sailboat.getNine();
	};
}

function TrainController($scope, southernpacific, santafe) {
	$scope.simple = "Simple Train";
	$scope.trainType = southernpacific.getDescription();
	$scope.santafeDescription = santafe.getDescription();
	$scope.getNine = function() {
		return southernpacific.getNine();
	};
}

