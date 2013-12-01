/**
 * @author John Pennock
 */


angular.module('bookMod', [])
.factory("bookFactory", function(){
	
	var bookLibrary = {
		library: [	{author: 'Charles Dickens',	book: 'A Tale of Two Cities'},
	 				{author: 'J.R.R. Tolkien',	book: 'The Lord of the Rings'},
	 				{author: 'Agatha Christie',	book: 'And Then There Were None'},
	 				{author: 'J.R.R. Tolkien',	book: 'The Hobbit'},
	 				{author: 'C.S. Lewis', 		book: 'The Lion, the Witch and the Wardrobe'}],
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
		}
	};

	return bookLibrary;
	
});