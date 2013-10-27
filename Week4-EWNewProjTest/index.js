/**
 * @author Charlie
 */

function MyController($scope) {
    $scope.hint = "Enter a number of miles";
    
    $scope.miles = 0;
    
    $scope.convertMilesToFeet = function() {
        return $scope.miles * 5280;  
    };
}
