/**
 * @author John Pennock
 */

describe("Mongo Db call", function() {'use strict';
	var $httpBackend = null;
	var dataCall = null;

	beforeEach(function() {
		module("characterDataMod");
	});

	beforeEach(inject(function($injector) {
		dataCall = $injector.get('characterGameData');
	}));

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("can get data", function() {
		expect(dataCall).toNotEqual(null);
	});

	it("can get planet mongo name", function() {
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE').respond([{
			"name" : "MONGO TEST PLANET",
			"type" : "planet",
			"hitPoints" : 11,
			"damage" : 22,
			"armorClass" : 33,
			"attackBonus" : 44,
			"damageBonus" : 55
		}, {
			"name" : "MONGO TEST CRUISER",
			"type" : "cruiser",
			"hitPoints" : 66,
			"damage" : 55,
			"armorClass" : 44,
			"attackBonus" : 33,
			"damageBonus" : 22
		}]);

		console.log("Getting ready to call the database");
		var result = dataCall(true, false, true);
		console.log("result: " + JSON.stringify(result));

		$httpBackend.flush();

		expect(result.planet.name).toEqual("MONGO TEST PLANET");
		expect(result.planet.hitPoints).toEqual(11);
		expect(result.planet.damage).toEqual(22);
		expect(result.planet.armorClass).toEqual(33);
		expect(result.planet.attackBonus).toEqual(44);
		expect(result.planet.damageBonus).toEqual(55);
	});

	it("can get planet mongo name with only planet data", function() {
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE').respond([{
			"name" : "MONGO TEST PLANET",
			"type" : "planet",
			"hitPoints" : 11,
			"damage" : 22,
			"armorClass" : 33,
			"attackBonus" : 44,
			"damageBonus" : 55
		}]);

		console.log("Getting ready to call the database");
		var result = dataCall(true, false, true);
		console.log("result: " + JSON.stringify(result));

		$httpBackend.flush();

		expect(result.planet.name).toEqual("MONGO TEST PLANET");
		expect(result.planet.hitPoints).toEqual(11);
		expect(result.planet.damage).toEqual(22);
		expect(result.planet.armorClass).toEqual(33);
		expect(result.planet.attackBonus).toEqual(44);
		expect(result.planet.damageBonus).toEqual(55);
	});

	it("can get cruiser mongo name", function() {
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE').respond([{
			"name" : "MONGO TEST PLANET",
			"type" : "planet",
			"hitPoints" : 11,
			"damage" : 22,
			"armorClass" : 33,
			"attackBonus" : 44,
			"damageBonus" : 55
		}, {
			"name" : "MONGO TEST CRUISER",
			"type" : "cruiser",
			"hitPoints" : 66,
			"damage" : 55,
			"armorClass" : 44,
			"attackBonus" : 33,
			"damageBonus" : 22
		}]);

		console.log("Getting ready to call the database");
		var result = dataCall(true, false, true);
		console.log("result: " + JSON.stringify(result));

		$httpBackend.flush();

		expect(result.cruiser.name).toEqual("MONGO TEST CRUISER");
		expect(result.cruiser.hitPoints).toEqual(66);
		expect(result.cruiser.damage).toEqual(55);
		expect(result.cruiser.armorClass).toEqual(44);
		expect(result.cruiser.attackBonus).toEqual(33);
		expect(result.cruiser.damageBonus).toEqual(22);
	});

	it("can get cruiser mongo name ONLY", function() {
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE').respond([{
			"name" : "MONGO TEST CRUISER",
			"type" : "cruiser",
			"hitPoints" : 66,
			"damage" : 55,
			"armorClass" : 44,
			"attackBonus" : 33,
			"damageBonus" : 22
		}]);

		console.log("Getting ready to call the database");
		var result = dataCall(true, false, true);
		console.log("result: " + JSON.stringify(result));

		$httpBackend.flush();

		expect(result.cruiser.name).toEqual("MONGO TEST CRUISER");
		expect(result.cruiser.hitPoints).toEqual(66);
		expect(result.cruiser.damage).toEqual(55);
		expect(result.cruiser.armorClass).toEqual(44);
		expect(result.cruiser.attackBonus).toEqual(33);
		expect(result.cruiser.damageBonus).toEqual(22);
	});
	
	it("can get gameboard mongo", function() {
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE').respond(
			[{
			"type" : "boards",
			"boards": [
				// Level 1
				[[4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 4, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
								
				// Level 2
				[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 4, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
				
				// Level 3
				[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
			]
		}]);

		console.log("Getting ready to call the database");
		var result = dataCall(true, false, true);

		$httpBackend.flush();

		expect(result.boards[0][0][0]).toEqual(4);
	});


	it("can survive garbage return", function() {
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE').respond([{}]);

		console.log("Getting ready to call the database");
		var result = dataCall(true, false, true);
		console.log("result: " + JSON.stringify(result));

		$httpBackend.flush();

		expect(result.mongoData).toEqual(null);
	});

});
