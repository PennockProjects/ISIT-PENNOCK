/**
 * @author Charlie Calvert
 */

/* global angular:true */

angular.module('characters', ['planetMod'])
.factory('people', function($http, planets) {'use strict';

	var peopleObj = {

		races : [{
			name : 'Dwarves',
			description : 'Typically about 4 feet tall, stocky, lifespan of 300-400 years. Thick hair and beards',
			hitDie : 1,
			languages : ['Common', 'Dwarvish'],
			classes : ['Cleric', 'Fighter', 'Thief']
		}, {
			name : 'Halflings',
			description : 'Typically 3 tall, 60 lbs., with curly hair, no facial hair, lifespan of about 100 years.',
			hitDie : 6,
			languages : ['Common', 'Halfling'],
			classes : ['Cleric', 'Fighter', 'Thief']
		}, {
			name : 'Elves',
			description : 'Typically about 5 feet tall, slender, 130 lbs. Lifespan of 1200 years or more. Pale with dark hair, pointed ears, little or no facial hair.',
			hitDie : 6,
			languages : ['Common', 'Elvish'],
			classes : ['Fighter', 'Magic User']
		}, {
			name : 'Humans',
			description : 'Average male is typically 6 feet tall, 175 lbs., and lives about 75 years.',
			hitDie : 1,
			languages : ['Common'],
			classes : ['Any']
		}],

		classes : [{
			name : 'Cleric',
			armor : 'any',
			hitDie : 6,
			shield : true,
			spells : ['none'],
			weapons : ['club', 'mace', 'maul', 'quarterstaff', 'sling', 'warhammer'],
			xpForLevelTwo : 1500
		}, {
			name : 'Fighter',
			armor : 'any',
			hitDie : 8,
			shield : true,
			spells : ['none'],
			weapons : ['Any'],
			xpForLevelTwo : 2000
		}, {
			name : 'Magic-User',
			armor : 'none',
			hitDie : 4,
			shield : false,
			spells : ['Charm Person', 'Detect Magic', 'Floating Disc', 'Hold Portal', 'Light', 'Magic Missile', 'Magic Mouth', 'Protection from Evil', 'Read Languages', 'Read Magic', 'Shield', 'Sleep', 'Ventriloquism'],
			weapons : ['cudgel', 'dagger', 'walking staff'],
			xpForLevelTwo : 2500
		}, {
			name : 'Thief',
			armor : 'leather',
			hitDie : 4,
			shield : false,
			spells : ['none'],
			weapons : ['any'],
			xpForLevelTwo : 1250
		}],

		hero : {
			// race: this.races[2],
			// "class": this.classes[2],
			name : "Imperial Cruiser",
			hitPoints : 12,
			damage : 0,
			armorClass : 9,
			attackBonus : 4,
			damageBonus : 1,
			jsonData : null,

			attack : function() {
				return (Math.floor(Math.random() * 20) + this.attackBonus);
			},
			attackDamage : function() {
				return (Math.floor(Math.random() * 4) + this.damageBonus);
			}
		},

		tower : function() {
			var towerObj = {
				name: "Default Tower Name",
				hitPoints: 4,
				damage: 0,
				armorClass: 7,
				attackBonus: 1,
				damageBonus: 1, 
				attack : function() {
					return Math.floor(Math.random() * 20) + this.attackBonus;
				},
				attackDamage : function() {
					return Math.floor(Math.random() * 4) + this.damageBonus;
				}
			};
			
			planets.query({}, function(planets) {
				console.log("num of planets: " + planets.length);
				for (var i = 0; i < planets.length; i++) {
					towerObj.name = planets[i].name;
					towerObj.hitPoints = planets[i].hitPoints;
					towerObj.damage = planets[i].damage;
					towerObj.armorClass = planets[i].armorClass;
					towerObj.attackBonus = planets[i].attackBonus;
					towerObj.damageBonus = planets[i].damageBonus;
					
					console.log("Planet #" + i + " name: " + planets[i].name);
					console.log("planet damage:" + planets[i].damage);
					console.log("planet ac:" + planets[i].armorClass);
					console.log("planet attack bonus:" + planets[i].attackBonus);
					console.log("planet damage bonus:" + planets[i].damageBonus);
				}
			});

			return towerObj;
		}
	};

	
	$http.get('/data.json').success(function(data, status, headers, config) {
		peopleObj.hero.name = data.name;
		peopleObj.hero.hitPoints = data.hitPoints;
		peopleObj.hero.damage = data.damage;
		peopleObj.hero.armorClass = data.armorClass;
		peopleObj.hero.attackBonus = data.attackBonus;
		peopleObj.hero.damageBonus = data.damageBonus;
		peopleObj.hero.jsonData = data;
		// update the angular view scope
		angular.element(document.getElementById('textDisplay')).scope().name = data.name;
		angular.element(document.getElementById('textDisplay')).scope().armorClass = data.armorClass;
		angular.element(document.getElementById('textDisplay')).scope().hitPoints = data.hitPoints;
		angular.element(document.getElementById('textDisplay')).scope().damage = data.damage;
		

	}).error(function(data, status, headers, config) {
		throw new Error('Oh no! An Error!');
	});

	return (peopleObj);
});

angular.module('planetMod', ['ngResource']).factory('planets', function($resource) {
	console.log('Planets factory called');
	var Planets = $resource('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData/:id', {
		apiKey : '71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE',
	});

	Planets.prototype.getNextPlanet = function() {
		return "howdy";
	};

	return Planets;
});
