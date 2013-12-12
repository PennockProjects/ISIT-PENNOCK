/**
 * @author John Pennock
 */

describe("Test hero", function() {'use strict';
	var hero = null;
    
	beforeEach(function() {
		module('heroMod');				
	});
	
	beforeEach(inject(function($injector) {
		hero = $injector.get('hero');
	}));
	
	it("can get a hero object", function()  {			
		expect(hero).toNotEqual(null);
	});
	
	it("cruiser has all the default stats", function()  {			
		expect(hero.name).toEqual('Imperial Default Cruiser');
		expect(hero.hitPoints).toEqual(12);
		expect(hero.damage).toEqual(0);
		expect(hero.armorClass).toEqual(9);
		expect(hero.attackBonus).toEqual(4);
		expect(hero.damageBonus).toEqual(1);
	});
	
});