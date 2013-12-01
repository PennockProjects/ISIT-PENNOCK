// specs code
describe("music test", function() {'use strict';

	var music = null;

	beforeEach(function() {
		module('musicMod');
	});
	
	beforeEach(inject(function($injector) {
		music = $injector.get('musicFactory');
	}));

	it("Music Library Length is 5", function() {
		expect(music.library.length).toEqual(5);
	});
	
	it("getMusicianFromAlbum works", function() {
		expect(music.getMusicianFromAlbum("Back in Black")).toEqual("AC/DC");
	});
	
	it("getMusicianFromAlbum for unknwon returns null", function() {
		expect(music.getMusicianFromAlbum("Sgt. Peppers Lonely Heart's Club Band")).toEqual(null);
	});

	it("getAlbumFromMusician works", function() {
		expect(music.getAlbumFromMusician("AC/DC")).toEqual("Back in Black");
	});
	
	it("getAlbumFromMusician for unknown returns null", function() {
		expect(music.getAlbumFromMusician("Blondie")).toEqual(null);
	});

});

