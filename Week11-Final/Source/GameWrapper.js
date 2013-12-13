/**
 * @author Charlie Calvert
 */

angular.module('gameWrapMod', [])
.factory('gameWrap', function() { 'use strict';
	return {
		startGame: function(gameDiv, elfGameService) {
			Crafty.init(elfGameService.width(), elfGameService.height(), gameDiv);
			Crafty.game = elfGameService;
			console.log('Crafty.game set to elfGameService');
			Crafty.fDebug = false;
			Crafty.background('url(Assets/space.png)');
//			Crafty.background('rgb(0, 109, 20)');
			// Load the game
			Crafty.scene('Loading');
		},

		trigger: function() {

		}

	};
});

