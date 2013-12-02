/**
 * @author John Pennock
 */


angular.module('musicMod', [])
.factory("musicFactory", function($http) {

	var musicLibrary = {
		library: [],
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
		},
		getMusicDataFromServer: function() {
			var getDataJson = $http.get('musicdata.json');
			
			getDataJson.success(function(data, status, headers, config)  {
				musicLibrary.library = data;
				console.log("Read musicdata.json! " + JSON.stringify(data));
			});
				
			getDataJson.error(function(data, status, headers, config) {
				throw new Error('Unable to read musicdata.json!');
			});			
		}
	};

	return musicLibrary;
});