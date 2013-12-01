// specs code
describe("calculator", function() {'use strict';
	var addController = null;

	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		addController = $rootScope.$new();
		$controller('AddController', { $scope: addController }); 
	}));

	it("Calculator: Sum two values", function() {
		addController.operandA = 3;
		addController.operandB = 5;
		expect(addController.func()).toEqual(8);
	});

	it("Calculator: Sum two other values", function() {
		addController.operandA = 2;
		addController.operandB = 9;
		expect(addController.func()).toEqual(11);
	});
	
	it("Circle: Triangle Side C is correct", function() {
		addController.triangleSideA = 5;
		addController.triangleSideB = 12;
		expect(addController.trianglePythagorasC()).toEqual(13);
	});

});

