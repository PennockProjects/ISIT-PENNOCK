/**
 * @author John Pennock
 */

function diceController($scope) {
    $scope.hintD6 = "1D6";
    $scope.totalD6 = 0;
    $scope.rollD6 = function () {
		$scope.totalD6 = rollDie(6);
    };
    
    $scope.hint2D6 = "2D6";
    $scope.x2D6Rolls = [];
    $scope.total2D6 = 0;
    $scope.roll2D6 = function () {
    	$scope.x2D6Rolls.length = 0;
    	$scope.x2D6Rolls = [];
    	$scope.x2D6Rolls = rollDice(2, 6);
    	$scope.total2D6 = $scope.x2D6Rolls.shift();
    };
    
    $scope.hint3D6 = "3D6";
    $scope.total3D6 = 0;
    $scope.x3D6Rolls = [];
    $scope.roll3D6 = function () {
    	$scope.x3D6Rolls.length = 0;
    	$scope.x3D6Rolls = [];
    	$scope.x3D6Rolls = rollDice(3, 6);
    	$scope.total3D6 = $scope.x3D6Rolls.shift();
    };
    
    $scope.hintD4 = "1D4";
    $scope.totalD4 = 0;
    $scope.rollD4 = function () {
		$scope.totalD4 = rollDie(4);
    };
    
    $scope.hintD10 = "1D10";
    $scope.totalD10 = 0;
    $scope.rollD10 = function () {
		$scope.totalD10 = rollDie(10);
    };
    
    $scope.hintD20 = "1D20";
    $scope.totalD20 = 0;
    $scope.rollD20 = function () {
		$scope.totalD20 = rollDie(20);
    };
    
    $scope.arbHint = "Arbitrary: Enter the number of dice and how many faces they have";
    $scope.arbNumDice = 7;
    $scope.arbFaces = 7;
    $scope.arbTotal = 0;
    $scope.arbRolls = [];
    $scope.rollArbitrary = function () {
    	$scope.arbRolls.length = 0;
    	$scope.arbRolls = [];
    	$scope.arbRolls = rollDice($scope.arbNumDice, $scope.arbFaces);
    	$scope.arbTotal = $scope.arbRolls.shift();
    };
}

function rollDie(maxDie) {
	return(Math.floor(Math.random() * maxDie) + 1);
}

function rollDice(numOfDice, maxOfDie) {
	var rolls = [];
	var total = 0;
	for(var i = 0; i < numOfDice; i++) {
		rolls.push(rollDie(maxOfDie));
		total += rolls[i];  
	}
	
	rolls.unshift(total);
	return(rolls);
}


