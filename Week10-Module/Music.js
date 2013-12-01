/**
 * @author John Pennock
 */


angular.module('musicMod', [])
.factory("musicFactory", function() {

	var musicLibrary = {
		library: [	{musician: 'Beatles', 			album: 'The White Album'},
	 				{musician: 'Michael Jackson', 	album: 'Thriller'},
	 				{musician: 'Pink Floyd', 		album: 'The Dark Side of the Moon'},
	 				{musician: 'AC/DC', 			album: 'Back in Black'},
	 				{musician: 'Eagles', 			album: 'Their Greatest Hits'}],
		getMusicianFromAlbum: function(albumName) {
			for(var i=0; i < this.library.length ; i++) {
				if(this.library[i].album === albumName) {
					return this.library[i].musician;
				}		
			}
			return null;
		},	 	
		getAlbumFromMusician: function(musicianName) {
			for(var i=0; i < this.library.length ; i++) {
				if(this.library[i].musician === musicianName) {
					return this.library[i].album;
				}		
			}
			return null;
		}
	};

	return musicLibrary;
	
});