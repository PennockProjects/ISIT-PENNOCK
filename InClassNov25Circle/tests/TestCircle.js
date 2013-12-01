// specs code

describe("Circle Direct Tests", function() {'use strict';

	var circle = null;

	beforeEach(function() {
		module('circleMod');
	});
	
	beforeEach(inject(function($injector) {
		circle = $injector.get("CircleFactory");
	}));

	it("Circle: Area is correct", function() {
		expect(circle.getAreaOfCircle(2)).toEqual(Math.PI*2*2);
	});

	it("Circle: Circumference is correct", function() {
		expect(circle.getCircumference(3)).toEqual(Math.PI*2*3);
	});
});

