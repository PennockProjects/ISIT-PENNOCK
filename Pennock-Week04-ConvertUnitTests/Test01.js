/**
 * @author Charlie
 */

describe("mycontrollertest", function() {'use strict';
	var $mockScope = null;
	var pc = null;

	beforeEach(inject(function($rootScope, $controller) {
		$mockScope = $rootScope.$new();
		pc = $controller('MyController', {
			$scope : $mockScope
		});
	}));

	it("Test hint", function() {
		expect($mockScope.hint).toEqual("Enter a number of miles");
	});

	it("TestMilesToFeetForOneMile", function() {
		$mockScope.miles = 1;
		var actual = $mockScope.convertMilesToFeet();
		expect(actual).toEqual(5280);
	});

	it("TestMilesToFeetFor2Miles", function() {
		$mockScope.miles = 2;
		var actual = $mockScope.convertMilesToFeet();
		expect(actual).toEqual(10560);
	});

	it("TestMilesToFeetForDefault", function() {
		var actual = $mockScope.convertMilesToFeet();
		expect(actual).toEqual(0);
	});

	// Unit tests for each conversion method
	it("TestMilesToInchesForOneInch", function() {
		$mockScope.miles = 1;
		var actual = $mockScope.convertMilesToInches();
		expect(actual).toEqual(63360);
	});

	it("TestMilesToYardsForOneYard", function() {
		$mockScope.miles = 1;
		var actual = $mockScope.convertMilesToYards();
		expect(actual).toEqual(1760);
	});

	it("MilesToKilometersForOneKM", function() {
		$mockScope.miles = 1;
		var actual = $mockScope.convertMilesToKilometers();
		expect(actual).toEqual(1.60934);
	});

	it("KilometersToMilesForOneMile", function() {
		$mockScope.kilometers = 1;
		var actual = $mockScope.convertKilometersToMiles();
		expect(actual).toEqual(0.621371);
	});
	
	// Unit tests for 
    //		The user enters 0
	it("TestMilesToInchesForZero", function() {
		$mockScope.miles = 0;
		var actual = $mockScope.convertMilesToInches();
		expect(actual).toEqual(0);
	});

	it("TestMilesToYardsForZero", function() {
		$mockScope.miles = 0;
		var actual = $mockScope.convertMilesToYards();
		expect(actual).toEqual(0);
	});

	it("MilesToKilometersForZero", function() {
		$mockScope.miles = 0;
		var actual = $mockScope.convertMilesToKilometers();
		expect(actual).toEqual(0);
	});

	it("KilometersToMilesForZero", function() {
		$mockScope.kilometers = 0;
		var actual = $mockScope.convertKilometersToMiles();
		expect(actual).toEqual(0);
	});	
    
    //		The user enters a negative number
	it("TestMilesToInchesForNegative", function() {
		$mockScope.miles = -55;
		var actual = $mockScope.convertMilesToInches();
		expect(actual).toEqual(0);
	});

	it("TestMilesToYardsForNegative", function() {
		$mockScope.miles = -55;
		var actual = $mockScope.convertMilesToYards();
		expect(actual).toEqual(0);
	});

	it("MilesToKilometersForNegative", function() {
		$mockScope.miles = -55;
		var actual = $mockScope.convertMilesToKilometers();
		expect(actual).toEqual(0);
	});

	it("KilometersToMilesForNegative", function() {
		$mockScope.kilometers = -55;
		var actual = $mockScope.convertKilometersToMiles();
		expect(actual).toEqual(0);
	});	
    
    //		The user enters a really, really big number
	it("TestMilesToInchesForBigN", function() {
		$mockScope.miles = 999999999999999999999999999999;
		var actual = $mockScope.convertMilesToInches();
		expect(actual).toEqual(-1);
	});

	it("TestMilesToYardsForBigN", function() {
		$mockScope.miles = 999999999999999999999999999999;
		var actual = $mockScope.convertMilesToYards();
		expect(actual).toEqual(-1);
	});

	it("MilesToKilometersForBigN", function() {
		$mockScope.miles = 999999999999999999999999999999;
		var actual = $mockScope.convertMilesToKilometers();
		expect(actual).toEqual(-1);
	});

	it("KilometersToMilesForBigN", function() {
		$mockScope.kilometers = 999999999999999999999999999999;
		var actual = $mockScope.convertKilometersToMiles();
		expect(actual).toEqual(-1);
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