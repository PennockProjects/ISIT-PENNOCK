/**
 * @author Charlie
 */

describe("dicecontroller", function() {'use strict';

	var diceController = null;

	beforeEach(module('appDice'));

	beforeEach(inject(function($rootScope, $controller) {
		diceController = $rootScope.$new();
		$controller('diceController', {	$scope : diceController	});
	}));

	it("1D6 Range Test - 250 times", function() {
		var actualRangeFails = 0;
		var expectedRangeFails = 0;

		for (var i = 0; i < 250; i++) {
			diceController.totalD6 = 0;
			diceController.rollD6();
			if ((diceController.totalD6 < 1) || (diceController.totalD6 > 6)) {
				actualRangeFails++;
			}
		}
		expect(actualRangeFails).toEqual(expectedRangeFails);
	});

	it("2D6 Range Test - 250 times", function() {
		var actualRangeFails = 0;
		var expectedRangeFails = 0;

		for (var i = 0; i < 250; i++) {
			diceController.total2D6 = 0;
			diceController.x2D6Rolls = [];
			diceController.roll2D6();
			if ((diceController.total2D6 < 2) || (diceController.total2D6 > 12)) {
				actualRangeFails++;
				console.log("fail2D: total(" + diceController.total2D6 + ") with (" + diceController.x2D6Rolls[0] + "," + diceController.x2D6Rolls[1] + "," + diceController.x2D6Rolls[2] + ") rolls");
			}
		}
		expect(actualRangeFails).toEqual(expectedRangeFails);
	});

	it("3D6 Range Test - 250 times", function() {
		var actualRangeFails = 0;
		var expectedRangeFails = 0;

		for (var i = 0; i < 250; i++) {
			diceController.total3D6 = 0;
			diceController.x3D6Rolls = [];
			diceController.roll3D6();
			if ((diceController.total3D6 < 3) || (diceController.total3D6 > 18)) {
				actualRangeFails++;
				console.log("fail3D: total(" + diceController.total3D6 + ") with (" + diceController.x3D6Rolls[0] + "," + diceController.x3D6Rolls[1] + "," + diceController.x3D6Rolls[2] + ") rolls");
			}
		}
		expect(actualRangeFails).toEqual(expectedRangeFails);
	});

	it("1D4 Range Test - 250 times", function() {
		var actualRangeFails = 0;
		var expectedRangeFails = 0;

		for (var i = 0; i < 250; i++) {
			diceController.totalD4 = 0;
			diceController.rollD4();
			if ((diceController.totalD4 < 1) || (diceController.totalD4 > 4)) {
				actualRangeFails++;
			}
		}
		expect(actualRangeFails).toEqual(expectedRangeFails);
	});

	it("1D10 Range Test - 250 times", function() {
		var actualRangeFails = 0;
		var expectedRangeFails = 0;

		for (var i = 0; i < 250; i++) {
			diceController.totalD10 = 0;
			diceController.rollD10();
			if ((diceController.totalD10 < 1) || (diceController.totalD10 > 10)) {
				actualRangeFails++;
			}
		}
		expect(actualRangeFails).toEqual(expectedRangeFails);
	});

	it("1D20 Range Test - 250 times", function() {
		var actualRangeFails = 0;
		var expectedRangeFails = 0;

		for (var i = 0; i < 250; i++) {
			diceController.totalD20 = 0;
			diceController.rollD20();
			if ((diceController.totalD20 < 1) || (diceController.totalD20 > 20)) {
				actualRangeFails++;
			}
		}
		expect(actualRangeFails).toEqual(expectedRangeFails);
	});

	it("Arbitrary Range Test - 1000 times", function() {
		var actualRangeFails = 0;
		var expectedRangeFails = 0;

		for (var i = 0; i < 1000; i++) {
			diceController.arbNumDice = Math.floor(Math.random() * 20) + 1;
			diceController.arbFaces = Math.floor(Math.random() * 20) + 1;
			diceController.arbTotal = 0;
			diceController.arbRolls = [];
			diceController.rollArbitrary();
			if ((diceController.arbTotal < diceController.arbNumDice) || (diceController.arbTotal > diceController.arbNumDice * diceController.arbFaces)) {
				actualRangeFails++;
				console.log("failArbitrary: total(" + diceController.arbTotal + ") with (" + diceController.arbNumDice + "d" + diceController.arbFaces + ")");
			}
		}
		expect(actualRangeFails).toEqual(expectedRangeFails);
	});

});

(function() {'use strict';
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var reporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(reporter);

	jasmineEnv.specFilter = function(spec) {
		return reporter.specFilter(spec);
	};

	var currentWindowOnload = window.onload;

	window.onload = function() {
		if (currentWindowOnload) {
			currentWindowOnload();
		}
		execJasmine();
	};

	function execJasmine() {
		jasmineEnv.execute();
	}

})(); 