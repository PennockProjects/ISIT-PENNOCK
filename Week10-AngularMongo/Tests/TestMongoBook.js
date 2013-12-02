/**
 * @author John Pennock
 */

describe("Mongo Book Tests", function() {'use strict';
    var bookController = null;    
    var $httpBackend = null;
    
    beforeEach(function() {
        module("mainModule");
        module("mongoModule");
    });
    
    beforeEach(inject(function($rootScope, $controller) {        
        bookController = $rootScope.$new();
        $controller('bookController', { $scope: bookController }); 
    }));
    
    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("Test book controller name", function() {
        expect(bookController.name).toEqual("bookController");
    });    

    it("Test Mock Mongo Book call", function() {
//        $httpBackend.expectGET('https://api.mongolab.com/api/1/databases/elvenlab01/collections/address?apiKey=qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy')
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/TopBooks?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE')
        .respond([
            {author: "Salmon Rushdie", book: "Satanic Verses"},
            {author: "Mark Twain", book: "Tom Sawyer"}
          ]);
        bookController.loadBookData();
        $httpBackend.flush();
        expect(bookController.books[0].author).toEqual('Salmon Rushdie');
        expect(bookController.books[1].book).toEqual('Tom Sawyer');
    });

});
