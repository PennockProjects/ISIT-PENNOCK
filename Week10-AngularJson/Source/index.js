/**
 * @author John Pennock
 */


var app = angular.module('myApp', ['musicMod', 'bookMod']);

/* Set up a simple controller for music */
app.controller('MusicController', function($scope, $http, musicFactory) {
	$scope.musicLibrary = musicFactory;
});

/* Set up a simple controller for music  */
app.controller('BookController', function($scope, bookFactory) {
	$scope.bookLibrary = bookFactory;
});