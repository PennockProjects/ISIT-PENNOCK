/**
 * @author John Pennock
 */

describe("Test planets", function() {'use strict';
	var planet = null;
    
	beforeEach(function() {
		module('planetMod');				
	});
	
	beforeEach(inject(function($injector) {
		var dataCall = $injector.get('planets');
		planet = dataCall(false);
	}));
	
	it("can get a planet object", function()  {			
		expect(planet).toNotEqual(null);
	});
	
	it("planet has default name", function()  {			
		expect(planet.name).toEqual('Default Planet');
	});
	
	it("planet has default hitPoints", function()  {			
		expect(planet.hitPoints).toEqual(4);
	});

	it("planet has default damage", function()  {			
		expect(planet.damage).toEqual(0);
	});

	it("planet has default armorClass", function()  {			
		expect(planet.armorClass).toEqual(7);
	});

	it("planet has default attackBonus", function()  {			
		expect(planet.attackBonus).toEqual(1);
	});

	it("planet has default damageBonus", function()  {			
		expect(planet.damageBonus).toEqual(1);
	});
});