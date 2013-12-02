/**
 * @author John Pennock
 */

describe("Mongo Music Tests", function() {'use strict';
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

    it("Test Mock Mongo Music call", function() {
//        $httpBackend.expectGET('https://api.mongolab.com/api/1/databases/elvenlab01/collections/address?apiKey=qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy')
		$httpBackend.expectGET('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/TopAlbums?apiKey=71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE')
        .respond([
            {musician: "Rush", album: "2112"},
            {musician: "Eurythmics", album: "Money"}
          ]);
        musicController.loadMusicData();
        $httpBackend.flush();
        expect(musicController.albums[0].musician).toEqual('Rush');
        expect(musicController.albums[1].album).toEqual('Money');
    });

});
