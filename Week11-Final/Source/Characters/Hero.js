/**
 * @author John Pennock, modified from Charlie Calvert JsObject Crafty project
 */

angular.module('heroMod', ['characterDataMod'])
.factory('hero', function(characterGameData) {'use strict';
	
//	console.log('Hero factory called.  Crafty.fDebug: ' + Crafty.fDebug);
	var heroData = characterGameData(true, false);
	return heroData.cruiser;
	 
});

/*	// define the heroObject before we return so we can fetch data from the database and stuff it in. 
	//  otherwise we don't have a named target for the return path
	function Cruiser(fCallMongo, fCallJson) {
		var cruiser  = {
				// race: this.races[2],
				// "class": this.classes[2],
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
		} ;
		
		var cruiserMongo = $resource(
			'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
			'/collections/' + CONFIG.COLLECTION_CRUISER + '/:id', {
			apiKey: CONFIG.API_KEY
		});
	
		if(!Crafty.fDebug && fCallMongo) {
			console.log("Hero Factory: looking for Mongo data");
			cruiserMongo.query({}, function(mongoData) {
				console.log("cruiser mongo data: " + JSON.stringify(mongoData));
				cruiser.mongoData = mongoData;
				cruiser.name = mongoData[0].name;
				cruiser.hitPoints = mongoData[0].hitPoints;
				cruiser.damage = mongoData[0].damage;
				cruiser.armorClass = mongoData[0].armorClass;
				cruiser.attackBonus = mongoData[0].attackBonus;
				cruiser.damageBonus = mongoData[0].damageBonus;
				if(!Crafty.fDebug ) {
					angular.element(document.getElementById('textDisplay')).scope().name = cruiser.name;
					angular.element(document.getElementById('textDisplay')).scope().armorClass = cruiser.armorClass;
					angular.element(document.getElementById('textDisplay')).scope().hitPoints = cruiser.hitPoints;
					angular.element(document.getElementById('textDisplay')).scope().damage = cruiser.damage;
				}
			});
		}
		
/*		if(!Crafty.fDebug || fCallJson) {
			console.log("Hero Factory: looking for JSON file");
			$http.get('/data.json').success(function(data, status, headers, config) {
			console.log("data.json found for Cruiser: " + JSON.stringify(data));
			cruiser.name = data.name;
			cruiser.hitPoints = data.hitPoints;
			cruiser.damage = data.damage;
			cruiser.armorClass = data.armorClass;
			cruiser.attackBonus = data.attackBonus;
			cruiser.damageBonus = data.damageBonus;
			cruiser.jsonData = data;
			// update the angular view scope
			if(!Crafty.fDebug ) {
				angular.element(document.getElementById('textDisplay')).scope().name = data.name;
				angular.element(document.getElementById('textDisplay')).scope().armorClass = data.armorClass;
				angular.element(document.getElementById('textDisplay')).scope().hitPoints = data.hitPoints;
				angular.element(document.getElementById('textDisplay')).scope().damage = data.damage;
			}
			
			}).error(function(data, status, headers, config) {
				throw new Error('Oh no! An Error!');
			});
		}
		return cruiser;
	}

});
*/	
