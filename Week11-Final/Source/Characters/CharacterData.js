/**
 * @author John Pennock, modified from Charlie Calvert JsObject Crafty project
 */

angular.module('characterDataMod', ['ngResource'])
.constant('CONFIG', {
	DB_NAME: 'isit-pennock-azure',
	COLLECTION: 'QuellData',
	API_KEY: '71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE'
})
.factory('characterGameData', function($resource, CONFIG) {'use strict';
// console.log('characterGameData factory called');

	function GameData(fCallMongo, fCallJson, fDebugCallMongo) {
		
		var gameData  = {
			mongoData: null,
			cruiser: {
				name : "Imperial Default Cruiser",
				hitPoints : 12,
				damage : 0,
				armorClass : 9,
				attackBonus : 4,
				damageBonus : 1,
				jsonData : null,
				mongoData : null,
				attack : function() {
					return (Math.floor(Math.random() * 20) + this.attackBonus);
				},
				attackDamage : function() {
					return (Math.floor(Math.random() * 4) + this.damageBonus);
				}
			},
			planet: {
				name: "Default Planet",
				hitPoints: 4,
				damage: 0,
				armorClass: 7,
				attackBonus: 1,
				damageBonus: 1,
				jsonData: null,
				mongoData: null,
				attack : function() {
					return Math.floor(Math.random() * 20) + this.attackBonus;
				},
				attackDamage : function() {
					return Math.floor(Math.random() * 4) + this.damageBonus;
				}
			}
		};
	
		
		var fDebug = true;
		if(Crafty.fDebug !== undefined) {
			fDebug = Crafty.fDebug;
		}
		
		if(fDebugCallMongo === undefined) {
			fDebugCallMongo = false;
		}
		
	
//		console.log("fDebugCallMongo: "+ fDebugCallMongo + " fCallMongo: "+ fCallMongo + " fDebug: " + fDebug);
		if(fDebugCallMongo || (fCallMongo && !fDebug)) {
			console.log("characterGameData Factory: looking for Mongo data");
	
			$resource(
				'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
				'/collections/' + CONFIG.COLLECTION + '/:id', {
				apiKey: CONFIG.API_KEY
			}).query({}, function(mongoCharacters) {
				console.log("Recievied mongoCharacters number : " + mongoCharacters.length);
				Crafty.fGetDBData = false;
				for (var i = 0; i < mongoCharacters.length; i++) {
					switch(mongoCharacters[i].type) {
						case 'planet':
							console.log("Mongo Planet #" + i);
							gameData.planet.mongoData = mongoCharacters[i];
							gameData.planet.name = mongoCharacters[i].name;
							gameData.planet.hitPoints = mongoCharacters[i].hitPoints;
							gameData.planet.damage = mongoCharacters[i].damage;
							gameData.planet.armorClass = mongoCharacters[i].armorClass;
							gameData.planet.attackBonus = mongoCharacters[i].attackBonus;
							gameData.planet.damageBonus = mongoCharacters[i].damageBonus;
							
							console.log("planet hitPoints:" + mongoCharacters[i].hitPoints);
							console.log("planet damage:" + mongoCharacters[i].damage);
							console.log("planet ac:" + mongoCharacters[i].armorClass);
							console.log("planet attack bonus:" + mongoCharacters[i].attackBonus);
							console.log("planet damage bonus:" + mongoCharacters[i].damageBonus);
							break;
							
						case 'cruiser':
							console.log("Mongo Cruiser #" + i);
							gameData.cruiser.mongoData = mongoCharacters[i];
							gameData.cruiser.name = mongoCharacters[i].name;
							gameData.cruiser.hitPoints = mongoCharacters[i].hitPoints;
							gameData.cruiser.damage = mongoCharacters[i].damage;
							gameData.cruiser.armorClass = mongoCharacters[i].armorClass;
							gameData.cruiser.attackBonus = mongoCharacters[i].attackBonus;
							gameData.cruiser.damageBonus = mongoCharacters[i].damageBonus;
							console.log("cruiser hitPoints:" + mongoCharacters[i].hitPoints);
							console.log("cruiser damage:" + mongoCharacters[i].damage);
							console.log("cruiser ac:" + mongoCharacters[i].armorClass);
							console.log("cruiser attack bonus:" + mongoCharacters[i].attackBonus);
							console.log("cruiser damage bonus:" + mongoCharacters[i].damageBonus);
							if(!Crafty.fDebug) {
								angular.element(document.getElementById('textDisplay')).scope().name = gameData.cruiser.name;
								angular.element(document.getElementById('textDisplay')).scope().armorClass = gameData.cruiser.armorClass;
								angular.element(document.getElementById('textDisplay')).scope().hitPoints = gameData.cruiser.hitPoints;
								angular.element(document.getElementById('textDisplay')).scope().damage = gameData.cruiser.damage;
							}
							break;
						default:
							console.log("Unknown Character Type "+ mongoCharacters[i].type);
							break;
					}
				}
			});
		}
		
		return gameData;
	}
	
	return GameData;
});
