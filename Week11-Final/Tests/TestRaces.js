/**
 * @author Charlie
 */

describe("TestRaces", function() {'use strict';

	var races = null;

	beforeEach(function() {
		module('raceMod');
	});

	beforeEach(inject(function($injector) {
		races = $injector.get('races');
	}));

	it("can get a race", function() {
		expect(races).toNotEqual(null);
	});

	it("can get a dwarf", function() {
		expect(races[0].name).toNotEqual('Dwarf');
	});

	it("can find halflings", function() {
		var singleRace = races[1];
		expect(singleRace.name).toEqual('Halflings');
	});

	it("can find halfling description length", function() {
		var singleRace = races[1];
		expect(singleRace.description.length).toEqual(88);
	});

	it("can find halflings hitDie", function() {
		var singleRace = races[1];
		expect(singleRace.hitDie).toEqual(6);
	});

	it("can find halfling 1st languages", function() {
		var singleRace = races[1];
		expect(singleRace.languages[0]).toEqual('Common');
	});

	it("can find halfling 1st class", function() {
		var singleRace = races[1];
		expect(singleRace.classes[0]).toEqual('Cleric');
	});

// Elves

	it("can find elves", function() {
		var singleRace = races[2];
		expect(singleRace.name).toEqual('Elves');
	});

	it("can find elves hitDie", function() {
		var singleRace = races[2];
		expect(singleRace.hitDie).toEqual(6);
	});

	it("can find elves 1st languages", function() {
		var singleRace = races[2];
		expect(singleRace.languages[0]).toEqual('Common');
	});

	it("can find elves 1st class", function() {
		var singleRace = races[2];
		expect(singleRace.classes[0]).toEqual('Fighter');
	});

}); 