/**
 * @author John Pennock
 */

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
	init: function() { 'use strict';
		this.requires('Actor, spr_village');
	},

	// Process a visitation with this village
	visit: function() { 'use strict';
		this.destroy();
		Crafty.audio.play('quelled');
		Crafty.trigger('VillageVisited', this);
	}
});


