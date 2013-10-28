/**
 * @author John
 */

describe("My Controller Test", function() {'use strict';
    var $mockScope = null;
    var pc = null;

    beforeEach(inject(function($rootScope, $controller) {
        $mockScope = $rootScope.$new();
        pc = $controller('MyController', { $scope: $mockScope }); 
    }));

	// tests go here
    it("Test hint", function() {
        expect($mockScope.hint).toEqual("This is my hint");
    });
    
	it("Test hints", function() {
        expect($mockScope.hints).toEqual("This is my hints");
    });
    
   	it("Test Miles to Feet", function() {
   		$mockScope.miles = 1;
   		var actual = $mockScope.convertMilesToFeet();
        expect(actual).toEqual(5280);
    });


});

// boilerplate initializes jasmine
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