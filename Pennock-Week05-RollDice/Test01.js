/**
 * @author Charlie
 */

describe("dicecontroller", function() {'use strict';
    var $mockScope = null;
    var pc = null;

    beforeEach(inject(function($rootScope, $controller) {
        $mockScope = $rootScope.$new();
        pc = $controller('diceController', { $scope: $mockScope }); 
    }));

    it("1D6 Range Test - 250 times", function() {
    	var actualRangeFails = 0;
    	var expectedRangeFails = 0;
    	
    	for(var i=0; i<250; i++) {
    		$mockScope.totalD6 = 0;
	        $mockScope.rollD6();
	        if(($mockScope.totalD6 < 1) || ($mockScope.totalD6 > 6)) {
	        	actualRangeFails++;
	        }
	   	}
        expect(actualRangeFails).toEqual(expectedRangeFails);
    });

    it("2D6 Range Test - 250 times", function() {
    	var actualRangeFails = 0;
    	var expectedRangeFails = 0;
    	
    	for(var i=0; i<250; i++) {
    		$mockScope.total2D6 = 0;
    		$mockScope.x2D6Rolls = [];
	        $mockScope.roll2D6();
	        if(($mockScope.total2D6 < 2) || ($mockScope.total2D6 > 12)) {
	        	actualRangeFails++;
	        	console.log("fail2D: total(" + $mockScope.total2D6 + ") with (" + $mockScope.x2D6Rolls[0] + "," + $mockScope.x2D6Rolls[1] + "," + $mockScope.x2D6Rolls[2] + ") rolls");
	        }
	   	}
        expect(actualRangeFails).toEqual(expectedRangeFails);
    });

    it("3D6 Range Test - 250 times", function() {
    	var actualRangeFails = 0;
    	var expectedRangeFails = 0;
    	
    	for(var i=0; i<250; i++) {
    		$mockScope.total3D6 = 0;
    		$mockScope.x3D6Rolls = [];
	        $mockScope.roll3D6();
	        if(($mockScope.total3D6 < 3) || ($mockScope.total3D6 > 18)) {
	        	actualRangeFails++;
	        	console.log("fail3D: total(" + $mockScope.total3D6 + ") with (" + $mockScope.x3D6Rolls[0] + "," + $mockScope.x3D6Rolls[1] + "," + $mockScope.x3D6Rolls[2] + ") rolls");
	        }
	   	}
        expect(actualRangeFails).toEqual(expectedRangeFails);
    });

    it("1D4 Range Test - 250 times", function() {
    	var actualRangeFails = 0;
    	var expectedRangeFails = 0;
    	
    	for(var i=0; i<250; i++) {
    		$mockScope.totalD4 = 0;
	        $mockScope.rollD4();
	        if(($mockScope.totalD4 < 1) || ($mockScope.totalD4 > 4)) {
	        	actualRangeFails++;
	        }
	   	}
        expect(actualRangeFails).toEqual(expectedRangeFails);
    });
    
    it("1D10 Range Test - 250 times", function() {
    	var actualRangeFails = 0;
    	var expectedRangeFails = 0;
    	
    	for(var i=0; i<250; i++) {
    		$mockScope.totalD10 = 0;
	        $mockScope.rollD10();
	        if(($mockScope.totalD10 < 1) || ($mockScope.totalD10 > 10)) {
	        	actualRangeFails++;
	        }
	   	}
        expect(actualRangeFails).toEqual(expectedRangeFails);
    });

    it("1D20 Range Test - 250 times", function() {
    	var actualRangeFails = 0;
    	var expectedRangeFails = 0;
    	
    	for(var i=0; i<250; i++) {
    		$mockScope.totalD20 = 0;
	        $mockScope.rollD20();
	        if(($mockScope.totalD20 < 1) || ($mockScope.totalD20 > 20)) {
	        	actualRangeFails++;
	        }
	   	}
        expect(actualRangeFails).toEqual(expectedRangeFails);
    });

    it("Arbitrary Range Test - 1000 times", function() {
    	var actualRangeFails = 0;
    	var expectedRangeFails = 0;

    	for(var i=0; i<1000; i++) {
    		$mockScope.arbNumDice = Math.floor(Math.random() * 20) + 1;
    		$mockScope.arbFaces = Math.floor(Math.random() * 20) + 1;
    		$mockScope.arbTotal = 0;
		    $mockScope.arbRolls = [];
	        $mockScope.rollArbitrary();
	        if(($mockScope.arbTotal < $mockScope.arbNumDice) || ($mockScope.arbTotal > $mockScope.arbNumDice*$mockScope.arbFaces)) {
	        	actualRangeFails++;
	        	console.log("failArbitrary: total(" + $mockScope.arbTotal + ") with (" + $mockScope.arbNumDice + "d" + $mockScope.arbFaces + ")");
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