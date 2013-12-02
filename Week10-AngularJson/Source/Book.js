/**
 * @author John Pennock
 */


angular.module('bookMod', [])
.factory("bookFactory", function($http){
	
	var bookLibrary = {
		library: [],
		getAuthorFromBook: function(bookName) {
			for(var i=0; i < this.library.length ; i++) {
				if(this.library[i].book === bookName) {
					return this.library[i].author;
				}		
			}
			return null;
		},	 	
		getBookFromAuthor: function(authorName) {
			for(var i=0; i < this.library.length ; i++) {
				if(this.library[i].author === authorName) {
					return this.library[i].book;
				}		
			}
			return null;
		},
		getBookDataFromServer: function() {
			var getDataJson = $http.get('bookdata.json');
			
			getDataJson.success(function(data, status, headers, config)  {
				bookLibrary.library = data;
				console.log("Read bookdata.json! " + JSON.stringify(data));
			});
				
			getDataJson.error(function(data, status, headers, config) {
				throw new Error('Unable to read musicdata.json!');
			});
		}
	};

	return bookLibrary;
});