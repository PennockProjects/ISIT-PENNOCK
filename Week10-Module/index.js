/**
 * @author Charlie Calvert
 */


var app = angular.module('myApp', ['musicMod', 'bookMod']);

/* Set up a simple controller with a few  */
app.controller('MusicController', function($scope, musicFactory) {
	$scope.musicLibrary = musicFactory['library'];
});

/* Set up a simple controller with a few  */
app.controller('BookController', function($scope, bookFactory) {
	$scope.bookLibrary = bookFactory['library'];
});