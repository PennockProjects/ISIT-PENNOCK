/**
 * @author John
 */

function MyController($scope) 
{
	$scope.hint = "This is my hint";
	$scope.hints = "This is my hints";
	$scope.miles = 0;
	
	$scope.convertMilesToFeet = function() {
		return $scope.miles * 5280;
	};
}
