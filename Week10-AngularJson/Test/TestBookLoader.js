/**
 * @author John Pennock
 */

describe("Book.js json loader tests", function() {'use strict';
	var book = null;
	var $httpBackend = null;

	beforeEach(function() {
		module('bookMod');
	});
	
	beforeEach(inject(function($injector) {
		book = $injector.get('bookFactory');
	}));

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("Test load json name", function() {
		$httpBackend.expectGET('bookdata.json').respond([{
			"author": "Suzanne Collins",
			"book": "Catching Fire"
		}]);
		book.getBookDataFromServer();
		$httpBackend.flush();
		expect(book.library[0].book).toEqual("Catching Fire");
	});

	it("Book Library Length is 1", function() {
		$httpBackend.expectGET('bookdata.json').respond([{
			"author": "Suzanne Collins",
			"book": "Catching Fire"
		}]);
		book.getBookDataFromServer();
		$httpBackend.flush();
		expect(book.library.length).toEqual(1);
	});
	
	it("getAuthorFromBook works", function() {
		$httpBackend.expectGET('bookdata.json').respond([{
			"author": "Suzanne Collins",
			"book": "Catching Fire"
		}]);
		book.getBookDataFromServer();
		$httpBackend.flush();
		expect(book.getAuthorFromBook("Catching Fire")).toEqual("Suzanne Collins");
	});
	
	it("getAuthorFromBook for unknwon returns null", function() {
		$httpBackend.expectGET('bookdata.json').respond([{
			"author": "Suzanne Collins",
			"book": "Catching Fire"
		}]);
		book.getBookDataFromServer();
		$httpBackend.flush();
		expect(book.getAuthorFromBook("Hunger Games")).toEqual(null);
	});

	it("getBookFromAuthor works", function() {
		$httpBackend.expectGET('bookdata.json').respond([{
			"author": "Suzanne Collins",
			"book": "Catching Fire"
		}]);
		book.getBookDataFromServer();
		$httpBackend.flush();
		expect(book.getBookFromAuthor("Suzanne Collins")).toEqual("Catching Fire");
	});
	
	it("getBookFromAuthor for unknown returns null", function() {
		$httpBackend.expectGET('bookdata.json').respond([{
			"author": "Suzanne Collins",
			"book": "Catching Fire"
		}]);
		book.getBookDataFromServer();
		$httpBackend.flush();
		expect(book.getBookFromAuthor("Suzanne Coll")).toEqual(null);
	});


});
