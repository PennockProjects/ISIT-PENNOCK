/**
 * @author Charlie
 */

describe("TestClasses", function() {'use strict';

	var classes = null;

	beforeEach(function() {
		module('classMod');
	});

	beforeEach(inject(function($injector) {
		classes = $injector.get('classes');
	}));

	it("can get a classes object", function() {
		expect(classes).toNotEqual(null);
	});

	it("can get a cleric name", function() {
		expect(classes[0].name).toEqual('Cleric');
	});

	it("can get a figher and armor", function() {
		expect(classes[1].name).toEqual('Fighter');
		expect(classes[1].armor).toEqual('any');
	});

	it("can get a magic-user and shield", function() {
		expect(classes[2].name).toEqual('Magic-User');
		expect(classes[2].shield).toEqual(false);		
	});

	it("can a thief", function() {
		var singleClass = classes[3];
		expect(singleClass.name).toEqual('Thief');
		expect(singleClass.armor).toEqual('leather');
		expect(singleClass.hitDie).toEqual(4);
		expect(singleClass.shield).toEqual(false);		
		expect(singleClass.spells.length).toEqual(1);
		expect(singleClass.spells[0]).toEqual('none');
		expect(singleClass.xpForLevelTwo).toEqual(1250);
	});
}); 