/**
 * @author John Pennock, modified from Charlie Calvert JsObject Crafty project
 */
/* jshint browser: true */

angular.module('elfGameMod', ['characterMod', 'gameWrapMod'])
.factory('elfGameService', function(gameEventService, people, gameWrap) {'use strict';
	return {

		map_grid : null,

		misses : 0,
		
		currentLevel: 0,

		defaultMapGrid : {
			width : 18,
			height : 12,
			tile : {
				width : 32,
				height : 32
			}
		},
		
		gameBoards: people.boards,

		villages : [],

		reportEvent : function(message) {
			return gameEventService.towerBroadcast(message);
		},

		changeDirectionMessage : function(message) {
			return gameEventService.changeDirectionBroadcast(message);
		},

		sendDebugMessage : function(message) {
			return gameEventService.debugBroadcast(message);
		},

		rollD3 : function() {
			return Math.floor(Math.random() * 3) + 1;
		},

		encounterFood : function(food) {
			if (people.hero.damage > 0) {
				people.hero.damage -= 1;
				if(!Crafty.fDebug) {
					angular.element(document.getElementById('textDisplay')).scope().damage = people.hero.damage;
				}
				gameEventService.debugBroadcast('damage healed by 1 pt.');
				gameEventService.encounterBroadcast('R&R at the starbase! damage healed by 1');
			} else {
				gameEventService.encounterBroadcast("You're at full health why stop for R&R?");
			}
			return true;
		},

		cruiserAttackPlanet : function(village) {
			var attackRoll = people.hero.attack();
			if (attackRoll > village.tower.armorClass) {
				var damage = people.hero.attackDamage();
				village.tower.damage += damage;
				Crafty.audio.play('blast');
				return ("Cruiser attack(" + attackRoll + ") hits for " + damage);
			} else {
				return ("Cruiser attack(" + attackRoll + ") misses " + village.tower.armorClass + " ac");
			}
		},

		planetAttackCruiser : function(village) {
			var attackRoll = village.tower.attack();
			if (attackRoll > people.hero.armorClass) {
				var damage = village.tower.attackDamage();
				people.hero.damage += damage;
				// update the scope
				if(!Crafty.fDebug) {
					angular.element(document.getElementById('textDisplay')).scope().damage = people.hero.damage;
				}
				Crafty.audio.play('defense');

				return ("Planet defends(" + attackRoll + ") hits for " + damage);

			} else {
				return ("Planet defends(" + attackRoll + ") misses " + people.hero.armorClass + " ac");
			}
		},

		encounter : function(village) {
			var result = this.cruiserAttackPlanet(village);
			if (result !== undefined) {
				gameEventService.debugBroadcast(result);
			}
			result = this.planetAttackCruiser(village);
			if (result !== undefined) {
				gameEventService.debugBroadcast(result);
			}

			gameEventService.debugBroadcast("Planet: " + (village.tower.hitPoints - village.tower.damage) + " hp left, Cruiser: " + (people.hero.hitPoints - people.hero.damage) + " hp left");
			if (people.hero.hitPoints - people.hero.damage <= 0) {
				gameEventService.encounterBroadcast("You Lose!");
				Crafty.trigger("youLose", Crafty);
			} else {
				gameEventService.encounterBroadcast('You can continue to fight');
			}

			if (village.tower.hitPoints - village.tower.damage <= 0) {
				gameEventService.encounterBroadcast('planet quelled!');
				return true;
			} else {
				gameEventService.encounterBroadcast('planet continues to resist');
				return false;
			}
		},

		newHero : function() {
			people.hero.damage = 0;
			if(!Crafty.fDebug) {
				angular.element(document.getElementById('textDisplay')).scope().name = people.hero.name;
				angular.element(document.getElementById('textDisplay')).scope().armorClass = people.hero.armorClass;
				angular.element(document.getElementById('textDisplay')).scope().hitPoints = people.hero.hitPoints;
				angular.element(document.getElementById('textDisplay')).scope().damage = people.hero.damage;
			}
			return (people.hero);
		},

		newVillage : function(village) {
			village.tower = people.tower(false);
			return this.villages.push(village);
		},

		// Get width of the game screen in pixels
		width : function() {
			return this.map_grid.width * this.map_grid.tile.width;
		},

		// Get height of the game screen in pixels
		height : function() {
			return this.map_grid.height * this.map_grid.tile.height;
		},

		initMapGrid : function(mapGrid) {
			this.map_grid = mapGrid;
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
			gameWrap.startGame(gameDiv, this);
		}
	};
});

