/**
 * @author John Pennock, modified from Charlie Calvert JsObject Crafty project
 */

/* global angular:true */

angular.module('characterMod', ['heroMod', 'planetMod', 'raceMod', 'classMod', 'gameBoardMod']).factory('people', function(hero, planets, races, classes, gameBoards) {'use strict';

	return {
		races: races,
		classes : classes,
		hero : hero,
		boards: gameBoards,
		tower : function(fDebugCallMongo) {
			return planets(fDebugCallMongo);
		},
	};
});

