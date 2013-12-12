/**
 * @author John Pennock
 */

// Food is a tile to heal damage
Crafty.c('Food', {
	count : 4,

	init : function() {'use strict';
		this.requires('Actor, spr_food');
	},

	visit : function() {'use strict';
		this.count--;
		switch (this.count) {
			case 3:
				Crafty.audio.play('sipup');
				this.sprite(1, 0);
				break;
			case 2:
				Crafty.audio.play('sipup');
				this.sprite(2, 0);
				break;

			case 1:
				Crafty.audio.play('sipup');
				this.sprite(3, 0);
				break;

			default:
				Crafty.audio.play('powerup');
				this.destroy();
				break;
		}

		Crafty.game.encounterFood(this, this.count);

	},

	switchComponent : function() {'use strict';
		this.toggleComponent('Food01', 'Food02');
	}
});
