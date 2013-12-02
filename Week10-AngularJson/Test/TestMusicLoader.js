/**
 * @author John Pennock
 */

describe("Music.js json loader tests", function() {'use strict';
	var music = null;
	var $httpBackend = null;

	beforeEach(function() {
		module('musicMod');
	});
	
	beforeEach(inject(function($injector) {
		music = $injector.get('musicFactory');
	}));

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("Test load json name", function() {
		$httpBackend.expectGET('musicdata.json').respond([{
			"musician": "Elvis Presley",
			"album": "The Classic Christmas Album"
		}]);
		music.getMusicDataFromServer();
		$httpBackend.flush();
		expect(music.library[0].musician).toEqual("Elvis Presley");
	});

	it("Music Library Length is 1", function() {
		$httpBackend.expectGET('musicdata.json').respond([{
			"musician": "Elvis Presley",
			"album": "The Classic Christmas Album"
		}]);
		music.getMusicDataFromServer();
		$httpBackend.flush();
		expect(music.library.length).toEqual(1);
	});
	
	it("getMusicianFromAlbum works", function() {
		$httpBackend.expectGET('musicdata.json').respond([{
			"musician": "Elvis Presley",
			"album": "The Classic Christmas Album"
		}]);
		music.getMusicDataFromServer();
		$httpBackend.flush();
		expect(music.getMusicianFromAlbum("The Classic Christmas Album")).toEqual("Elvis Presley");
	});
	
	it("getMusicianFromAlbum for unknwon returns null", function() {
		expect(music.getMusicianFromAlbum("Sgt. Peppers Lonely Heart's Club Band")).toEqual(null);
	});

	it("getAlbumFromMusician works", function() {
		$httpBackend.expectGET('musicdata.json').respond([{
			"musician": "Elvis Presley",
			"album": "The Classic Christmas Album"
		}]);
		music.getMusicDataFromServer();
		$httpBackend.flush();
		expect(music.getAlbumFromMusician("Elvis Presley")).toEqual("The Classic Christmas Album");
	});
	
	it("getAlbumFromMusician for unknown returns null", function() {
		expect(music.getAlbumFromMusician("Blondie")).toEqual(null);
	});


});
