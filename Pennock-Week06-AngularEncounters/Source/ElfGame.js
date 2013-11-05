/* jshint browser: true */

angular.module('elfGameMod', ['characters'])
.factory('elfgame', function(gameEventService, people) {

	return {

		map_grid : null,

		defaultMapGrid : {
			width : 18,
			height : 12,
			tile : {
				width : 32,
				height : 32
			}
		},

		towers : [],

		reportEvent : function(message) {
			gameEventService.towerBroadcast(message);
		},

		changeDirectionMessage : function(message) {
			gameEventService.changeDirectionBroadcast(message);
		},

		sendDebugMessage : function(message) {
			gameEventService.debugBroadcast(message);
		},

		cruiserAttackPlanet : function(village) {
			var attackRoll = people.hero.attack();
			if(attackRoll > village.tower.armorClass) {
				var damage = people.hero.attackDamage();
				village.tower.damage += damage;
				return("Cruiser: " + attackRoll + ", hits for " + damage);				
			}
		},

		planetAttackCruiser : function(village) {
			var attackRoll = village.tower.attack();
			if(attackRoll > people.hero.armorClass) {
				var damage = village.tower.attackDamage();
				people.hero.damage += damage;
				return("Planet: " + attackRoll + " hits for " + damage);				
			}
		},

		encounter : function(village) {
			var result = this.cruiserAttackPlanet(village);
			if(result !== undefined) {
				gameEventService.debugBroadcast(result);
			}
			result = this.planetAttackCruiser(village);
			if (result !== undefined) {
				gameEventService.debugBroadcast(result);
			}
			
			gameEventService.debugBroadcast("Planet: " + (village.tower.hitPoints-village.tower.damage) + " Cruiser: " + (people.hero.hitPoints-people.hero.damage));
			if (people.hero.hitPoints-people.hero.damage <= 0) {
				gameEventService.encounterBroadcast("You're dead!");
			} else {
				gameEventService.encounterBroadcast('You can continue to fight');
			}

			if (village.tower.hitPoints-village.tower.damage <= 0) {
				gameEventService.encounterBroadcast('planet quelled!');
				return true;
			} else {
				gameEventService.encounterBroadcast('planet continues to resist');
				return false;
			}
		},

		newVillage : function(village) {
			village.tower = people.tower();
			this.towers.push(village);
		},

		goLeft : function() {
			Crafty.trigger('goLeft', Crafty);
		},

		stopMove : function() {
			Crafty.trigger('stopMove', Crafty);
		},

		// Get width of the game screen in pixels
		width : function() {
			return this.map_grid.width * this.map_grid.tile.width;
		},

		// Get height of the game screen in pixels
		height : function() {
			return this.map_grid.height * this.map_grid.tile.height;
		},

		// Initialize and start our game
		start : function(mapGrid) {			
			// Start crafty
			var gameDiv = document.getElementById("gameBoard");
			if (mapGrid) {
				this.map_grid = mapGrid;
			} else {
				this.map_grid = this.defaultMapGrid;
			}
			Crafty.init(this.width(), this.height(), gameDiv);
			Crafty.game = this;
			Crafty.background('url(Assets/space.png)');
				// 'rgb(0, 109, 20)');

			// Call load scene, defined below
			Crafty.scene('Loading');
		}
	};
});

