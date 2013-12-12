/**
 * @author Charlie Calvert
 */

angular.module('gameWrapMod', [])
.factory('gameWrap', function() { 'use strict';
	return {
		startGame: function(gameDiv, elfGameService) {
			Crafty.game = elfGameService;
			Crafty.fDebug = true;
		},

		trigger: function() {

		}

	};
});

