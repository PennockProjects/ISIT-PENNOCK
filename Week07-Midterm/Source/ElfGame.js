/* jshint browser: true */

angular.module('elfGameMod', ['characters'])
.factory('elfgame', function(gameEventService, people, $http) { 'use strict';

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

		villages : [],

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
				return("Cruiser attack(" + attackRoll + ") hits for " + damage);				
			} else {
				return("Cruiser attack(" + attackRoll + ") misses " + village.tower.armorClass + " ac");				
			}
		},

		planetAttackCruiser : function(village) {
			var attackRoll = village.tower.attack();
			if(attackRoll > people.hero.armorClass) {
				var damage = village.tower.attackDamage();
				people.hero.damage += damage;
				// update the scope
				angular.element(document.getElementById('textDisplay')).scope().damage = people.hero.damage;

				return("Planet defends(" + attackRoll + ") hits for " + damage);				
			} else {
				return("Planet defends(" + attackRoll + ") misses " + people.hero.armorClass + " ac");				
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
			
			gameEventService.debugBroadcast("Planet: " + (village.tower.hitPoints-village.tower.damage) + " hp left, Cruiser: " + (people.hero.hitPoints-people.hero.damage) + " hp left");
			if (people.hero.hitPoints-people.hero.damage <= 0) {
				gameEventService.encounterBroadcast("You Lose!");
				Crafty.trigger("youLose", Crafty);
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
		
        encounterFood : function(food) {
            if(people.hero.damage > 0)
            {
            	people.hero.damage -= 1;
				angular.element(document.getElementById('textDisplay')).scope().damage = people.hero.damage;
  	 	        gameEventService.debugBroadcast('damage healed by 1 pt.');
	            gameEventService.encounterBroadcast('R&R at the starbase! damage healed by 1');
            } else {
            	gameEventService.encounterBroadcast("You're at full health why stop for R&R?");
            }
            return true;
        },
        
        newHero : function() {
        	people.hero.damage = 0;
			angular.element(document.getElementById('textDisplay')).scope().name = people.hero.name;
			angular.element(document.getElementById('textDisplay')).scope().armorClass = people.hero.armorClass;
			angular.element(document.getElementById('textDisplay')).scope().hitPoints = people.hero.hitPoints;
			angular.element(document.getElementById('textDisplay')).scope().damage = people.hero.damage;
        },
        
		newVillage : function(village) {
			village.tower = people.tower();
			this.villages.push(village);
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

