/**
 * @author John Pennock
 */

function MyController($scope) {
	$scope.hint = "Enter a number of miles";
	$scope.hintkm = "Enter a number of kilometers";

	$scope.miles = 0;
	$scope.kilometers = 0;

	$scope.convertMilesToFeet = function() {
		return $scope.miles * 5280;
	};

	$scope.convertMilesToInches = function() {
		return $scope.miles * 63360;
	};

	$scope.convertMilesToYards = function() {
		return $scope.miles * 1760;
	};

	$scope.convertMilesToKilometers = function() {
		return $scope.miles * 1.60934;
	};

	$scope.convertKilometersToMiles = function() {
		return $scope.kilometers * 0.621371;
	};

}
