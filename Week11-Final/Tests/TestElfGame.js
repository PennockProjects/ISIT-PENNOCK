/**
 * @author John Pennock, modified from Charlie Calvert JsObject Crafty project
 */


 describe("Test ElfGame", function() {'use strict';
	var elfController = null;
	var elfGameService = null;
	var character = null;

	beforeEach(function() {
		module('elfGameMod');
		module('elfPlayer');
		module('characterMod');
	});

	beforeEach(inject(function($rootScope, $controller, $injector) {
		elfController = $rootScope.$new();
		$controller('ElfController', { $scope: elfController});
		elfGameService = $injector.get('elfGameService');
		character = $injector.get('people');
	}));

	it("Can create gameEventService", function() {
		expect(elfGameService).toNotEqual(null);
	});


	it("gets the width of the playing field", function() {
		elfGameService.initMapGrid({
			width : 18,
			height : 12,
			tile : {
				width : 32,
				height : 32
			}
		});
		var actual = elfGameService.width();
		expect(actual).toEqual(576);
	});

	it("gets the height of the playing field", function() {
		elfGameService.initMapGrid({
			width : 18,
			height : 12,
			tile : {
				width : 32,
				height : 32
			}
		});
		var actual = elfGameService.height();
		expect(actual).toEqual(12 * 32);
	});

	it("rolls the D3", function() {
		for (var i = 0; i < 125; i++) {
			var actual = elfGameService.rollD3();
			expect(actual).toBeLessThan(4);
			expect(actual).toBeGreaterThan(0);
		}
	});

	it("new hero has no damage", function() {
		var actual = character.hero;
		expect(actual.damage).toEqual(0);	
	});
	
	it("registers a new village with the villages array", function() {
		var actual = elfGameService.newVillage({});
		expect(actual).toEqual(1);	
	});
	
	it("simulates an encounter", function() {
		var testTower = character.tower(false);
		// make tower have a bunch of hit points
		testTower.hitPoints = 25;
		var actual = elfGameService.encounter({ tower: testTower });
		expect(actual).toBe(false);
	});
	
	it("simulates an encounter tower end", function() {
		var testTower = character.tower(false);
		// make tower have 0 hit points
		testTower.hitPoints = 0;
		var actual = elfGameService.encounter({ tower: testTower });
		expect(actual).toBe(true);
	});
	
	it("simulates a food encounter", function() {
		var actual = elfGameService.encounterFood({ }, 0);
		expect(actual).toBe(true);
	});
	
	it("reports an event", function() {
		var actual = elfGameService.reportEvent();
		expect(actual).toEqual(true);
	});

	it("sends a change direction message", function() {
		var testValue = "turtled change direction message";
		var actual = elfGameService.changeDirectionMessage(testValue);
		expect(actual).toEqual(true);
	});

	it("sends a change direction message to elfcontroller", function() {
		var testValue = "turtle soup in elf controller";
		var actual = elfGameService.changeDirectionMessage(testValue);
		expect(actual).toEqual(true);
		expect(elfController.eventNote).toEqual(testValue);
	});

	it("sends a debug message", function() {
		var testValue = "turtled debug message";
		var actual = elfGameService.sendDebugMessage(testValue);
		expect(actual).toEqual(true);
	});

	it("sends a debug message to elfcontroller", function() {
		var testValue = "turtle debug soup elf controller";
		var actual = elfGameService.sendDebugMessage(testValue);
		expect(actual).toEqual(true);
		expect(elfController.debugMessages).toEqual([testValue]);
	});

	it("sends three debug messages to elfcontroller", function() {
		var testValue01 = "turtle debug soup elf controller1";
		var testValue02 = "turtle debug soup elf controller2";
		var testValue03 = "turtle debug soup elf controller3";
		elfGameService.sendDebugMessage(testValue01);
		elfGameService.sendDebugMessage(testValue02);
		var actual = elfGameService.sendDebugMessage(testValue03);
		expect(actual).toEqual(true);
		expect(elfController.debugMessages).toEqual([testValue03, testValue02, testValue01]);
	});
	
	it("is a very silly test", function() {
		expect(true).toBe(true);
	});
});

