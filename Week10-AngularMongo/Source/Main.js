 /**
 * @author Charlie Calvert
 */

 /* jshint devel: true */

angular.module('mainModule', ['mongoModule'])
.controller('musicController', function($scope, mongoAlbums) { 'use strict';

	$scope.name = "musicController";
	
	$scope.albumsLength = 0;
    $scope.userIndexSelection = 0;
    
    $scope.loadMusicData = function() {
        $scope.albums = mongoAlbums.query({}, function(albums) {
          $scope.albumsLength = albums.length;
          console.log($scope.albumsLength);
          $scope.userIndexSelection = 0;      
          $('#indexSelection').val("0");
          $scope.indexMusicChange();
        });
    };
    
    $scope.addAlbum = function() {
        var pres = new mongoAlbums({
            musician: $scope.musician,
            album: $scope.album,
        });
        pres.$save(function(album, r) {
            $scope.albums.push(album);
            $scope.albumsLength = $scope.albums.length;
        });
    };
    
    $scope.deleteRow = function() {
        var userIndexSelection = $scope.userIndexSelection;
        // if (userIndexSelection < $scope.albums.length) {}
        $scope.albums[userIndexSelection].remove(function(deletedObject, headers) {
            $scope.albums.splice(userIndexSelection, 1);
            $scope.albumsLength = $scope.albums.length;
        }, function(err) {
            console.log("error: " + err.data.message);  
        });
    };
    
    $scope.updateRow = function() {
        var indexOfItemToUpdate = $scope.userIndexSelection;
        $scope.albums[indexOfItemToUpdate].musician = $scope.musician;
        $scope.albums[indexOfItemToUpdate].album = $scope.album;
        $scope.albums[indexOfItemToUpdate].updateMe(function(data) {            
            console.log("success: " + data);
        }, function(err) {
            console.log("Error Status: " + err.status + ' ' + err.data.message);
        });  
    };
    
    $scope.indexMusicChange = function() {        
        $scope.musician = $scope.albums[$scope.userIndexSelection].musician;
        $scope.album = $scope.albums[$scope.userIndexSelection].album;
    };
})
.controller('bookController', function($scope, mongoBooks) { 'use strict';

	$scope.name = "bookController";
	
	$scope.booksLength = 0;
    $scope.userIndexSelectionBooks = 0;
    
    $scope.loadBookData = function() {
        $scope.books = mongoBooks.query({}, function(books) {
          $scope.booksLength = books.length;
          console.log($scope.booksLength);
          $scope.userIndexSelectionBooks = 0;      
          $('#indexSelection').val("0");
          $scope.indexBookChange();
        });
    };
    
    $scope.addBook = function() {
        var pres = new mongoBooks({
            author: $scope.author,
            book: $scope.book,
        });
        pres.$save(function(book, r) {
            $scope.books.push(book);
            $scope.booksLength = $scope.books.length;
        });
    };
    
    $scope.deleteBookRow = function() {
        var userIndexSelectionBooks = $scope.userIndexSelectionBooks;
        // if (userIndexSelectionBooks < $scope.books.length) {}
        $scope.books[userIndexSelectionBooks].remove(function(deletedObject, headers) {
            $scope.books.splice(userIndexSelectionBooks, 1);
            $scope.booksLength = $scope.books.length;
        }, function(err) {
            console.log("error: " + err.data.message);  
        });
    };
    
    $scope.updateBookRow = function() {
        var indexOfItemToUpdate = $scope.userIndexSelectionBooks;
        $scope.books[indexOfItemToUpdate].author = $scope.author;
        $scope.books[indexOfItemToUpdate].book = $scope.book;
        $scope.books[indexOfItemToUpdate].updateMe(function(data) {            
            console.log("success: " + data);
        }, function(err) {
            console.log("Error Status: " + err.status + ' ' + err.data.message);
        });  
    };
    
    $scope.indexBookChange = function() {        
        $scope.author = $scope.books[$scope.userIndexSelectionBooks].author;
        $scope.book = $scope.books[$scope.userIndexSelectionBooks].book;
    };
});



