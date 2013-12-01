// specs code

describe("Triangle Direct Tests", function() {'use strict';

	var triangle = null;

	beforeEach(function() {
		module('triangleMod');
	});
	
	beforeEach(inject(function($injector) {
		triangle = $injector.get("TriangleFactory");
	}));

	it("triangle: Area is correct", function() {
		expect(triangle.getPythagorasC(3,4)).toEqual(5);
	});

});

