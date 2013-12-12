/**
 * @author John Pennock
 */

angular.module('planetMod', ['characterDataMod'])
.factory('planets', function(characterGameData) {'use strict';
//	console.log('Planet factory called.  Crafty.fDebug: ' + Crafty.fDebug);
	
	var getPlanets = function(fDebugCallMongo) {
		var returnData = characterGameData(true, false, fDebugCallMongo);
		return (returnData.planet);
	};
	
	return getPlanets;
});

/*
angular.module('planetMod', ['ngResource'])
.constant('CONFIG', {
	DB_NAME: 'isit-pennock-azure',
	COLLECTION_PLANET: 'QuellData',
	API_KEY: '71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE'
})
.factory('planets', function($resource, CONFIG) { 'use strict';
	
console.log('Planets factory called');
	 
	var Planets = $resource(
		'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
		'/collections/' + CONFIG.COLLECTION_PLANET + '/:id', {
		apiKey: CONFIG.API_KEY
	});

	return Planets;
});

 angular.module('planetMod', ['ngResource'])
.factory('planets', function($resource) {'use strict';
	console.log('Planets factory called');
	var Planets = $resource('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/QuellData/:id', {
		apiKey : '71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE',
	});

	Planets.prototype.getNextPlanet = function() {
		return "howdy";
	};

	return Planets;
});
*/