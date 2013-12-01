// specs code
describe("book test", function() {'use strict';

	var book = null;

	beforeEach(function() {
		module('bookMod');
	});
	
	beforeEach(inject(function($injector) {
		book = $injector.get('bookFactory');
	}));

	it("Book Library Length is 5", function() {
		expect(book.library.length).toEqual(5);
	});
	
	it("getAuthorFromBook works", function() {
		expect(book.getAuthorFromBook("The Lord of the Rings")).toEqual("J.R.R. Tolkien");
	});
	
	it("getAuthorFromBook for unknwon returns null", function() {
		expect(book.getAuthorFromBook("Harry Potter")).toEqual(null);
	});

	it("ggetBookFromAuthor works", function() {
		expect(book.getBookFromAuthor("C.S. Lewis")).toEqual("The Lion, the Witch and the Wardrobe");
	});
	
	it("getBookFromAuthor for unknown returns null", function() {
		expect(book.getBookFromAuthor("John Pennock")).toEqual(null);
	});

});

