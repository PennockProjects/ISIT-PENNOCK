/**
 * @author Charlie Calvert
 */


var app = angular.module('myApp', ['circleMod', 'triangleMod']);

/* Set up a simple controller with a few  */
app.controller('AddController', function($scope, CircleFactory, TriangleFactory) {
// function AddController($scope) {
	$scope.operandA = 17000;
	$scope.operandB = 15000;

	$scope.func = function() {
		return $scope.operandA + $scope.operandB;
	};
	
	$scope.circleRadius = 5;
	
	$scope.circleArea = function() {
		return CircleFactory.getAreaOfCircle($scope.circleRadius);
	};
	
	$scope.circleCircumference = function() {
		return CircleFactory.getCircumference($scope.circleRadius);
	};
	
	$scope.triangleSideA = 3;
	$scope.triangleSideB = 4;
	
	$scope.trianglePythagorasC = function() {
		return TriangleFactory.getPythagorasC($scope.triangleSideA, $scope.triangleSideB);
	};
});