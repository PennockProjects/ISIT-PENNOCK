/**
 * @author John Pennock, modified from Charlie Calvert JsObject Crafty project
 */

angular.module('gameBoardMod', ['characterDataMod'])
.factory('gameBoards', function(characterGameData) {'use strict';
	
	console.log('GameBoard factory called.  Crafty.fDebug: ' + Crafty.fDebug);
	var data = characterGameData(true, false);
	return data.boards;
	 
});

