/**
 * @author Charlie Calvert
 */


/**
 * @author Charlie
 */

describe("music mongo test", function() {'use strict';
    var musicController = null;    
    var $httpBackend = null;
    
    beforeEach(function() {
        module("mainModule");
        module("mongoModule");
    });
    
    beforeEach(inject(function($rootScope, $controller) {        
        musicController = $rootScope.$new();
        $controller('musicController', { $scope: musicController }); 
    }));
    
    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("Test music controller name", function() {
        expect(musicController.name).toEqual("musicController");
    });    
    
    it("can find tower hitpoints", function() {
        $httpBackend.expectGET('https://api.mongolab.com/api/1/databases/elvenlab01/collections/address?apiKey=qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy')
        .respond([
            {presidentName: "George Washington", termEnd: 1, termStart: 11},
            {presidentName: "John Adams", termEnd: 2, termStart: 22},
            {presidentName: "Thomas Jefferson", termEnd: 3, termStart: 33}
          ]);
        musicController.loadData();
        $httpBackend.flush();
        expect(musicController.presidents[0].presidentName).toEqual('George Washington');
    });
});


