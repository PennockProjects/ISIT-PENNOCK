describe("TableEditor", function() {'use strict';
	var $scope = null;
	var pc = null;
	var $dialog = null;
	
	//mock Application to allow us to inject our own dependencies
//	beforeEach(angular.mock.module('pennprojedit'));
	// mock the controller for the same reason and include $rootScope and $controller
	beforeEach(inject(function($rootScope, $controller) {
		// create an empty scope
		$scope = $rootScope.$new();
		$dialog = $rootScope.$new();
		// declare the controller and inject our empty scope
		pc = $controller('TableEditor', { $scope: $scope, $dialog: $dialog }); 
	}));
	
	// tests start here
	// check field count
	it('Four fields in each object', function(){
		var fNotFourFields = false;
		var arrayElement, fieldCount;
		
		for (arrayElement = 0 ; arrayElement < $scope.NPCs.length; arrayElement++) {
			fieldCount = 0;
			for (var prop in $scope.NPCs[arrayElement]) {
				if ($scope.NPCs[arrayElement].hasOwnProperty(prop)) {
					fieldCount++;
				}
			}
			if(fieldCount !== 4) {
				fNotFourFields = true;
			}
		}
		expect(fNotFourFields).toBe(false);
//		expect($scope.NPCs[0].name).toBe('Ichy');	
	});

	// check types
	it('NPC.name is a string and NPC.hitPoints, NPC.health, NPC.totalMoves are numbers', function(){
		var fNotRightType = false;
		var arrayElement;
		
		for (arrayElement = 0 ; arrayElement < $scope.NPCs.length; arrayElement++) {
			if(	(typeof ($scope.NPCs[arrayElement].name) !== 'string') ||
				(typeof ($scope.NPCs[arrayElement].hitPoints) !== 'number') || 
				(typeof ($scope.NPCs[arrayElement].health) !== 'number') ||
				(typeof ($scope.NPCs[arrayElement].totalMoves) !== 'number')
			) {
				fNotRightType = true;
			}
		}
		expect(fNotRightType).toBe(false);
	});
	
	// check first record for specific fields
	it('First record has Lucy, 25, 32, 0', function(){
		var fExactFields = false;
		
		if(	($scope.NPCs[0].name === 'Lucy') &&
			($scope.NPCs[0].hitPoints === 25) && 
			($scope.NPCs[0].health === 32) &&
			($scope.NPCs[0].totalMoves === 0)
		) {
			fExactFields = true;
		}
		expect(fExactFields).toBe(true);
	});
	
});