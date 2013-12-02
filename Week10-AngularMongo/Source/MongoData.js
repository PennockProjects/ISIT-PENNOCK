/**
 * @author Charlie Calvert
 */

/* global angular */

angular.module('mongoModule', ['ngResource'])
.constant('CONFIG', {
	DB_NAME: 'isit-pennock-azure',
	COLLECTION_ALBUMS: 'TopAlbums',
	COLLECTION_BOOKS: 'TopBooks',
	API_KEY: '71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE'
})
.factory('mongoAlbums', function($resource, CONFIG) { 'use strict';
	console.log('Albums factory called');
	var Albums = $resource(
		'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
		'/collections/' + CONFIG.COLLECTION_ALBUMS + '/:id', {
		apiKey: CONFIG.API_KEY
	},
	{
		update: {method:'PUT'}
	});

	Albums.prototype.updateMe = function (callback, errorCallback) {
		console.log("update called");
		return Albums.update(
			{id:this._id.$oid},
			angular.extend({}, this, {_id:undefined}),
			callback,
			errorCallback);
	};

	Albums.prototype.getMusician = function() {
		return this.musician;
	};

	Albums.prototype.getAlbum = function() {
		return this.album;
	};

	Albums.prototype.remove = function (cb, errorcb) {
		return Albums.remove({id:this._id.$oid}, cb, errorcb);
	};

	Albums.prototype['delete'] = function (cb, errorcb) {
		return this.remove(cb, errorcb);
	};

	return Albums;
})
.factory('mongoBooks', function($resource, CONFIG) { 'use strict';
	console.log('Books factory called');
	var Books = $resource(
		'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
		'/collections/' + CONFIG.COLLECTION_BOOKS + '/:id', {
		apiKey: CONFIG.API_KEY
	},
	{
		update: {method:'PUT'}
	});

	Books.prototype.updateMe = function (callback, errorCallback) {
		console.log("update called");
		return Books.update(
			{id:this._id.$oid},
			angular.extend({}, this, {_id:undefined}),
			callback,
			errorCallback);
	};

	Books.prototype.getAuthor = function() {
		return this.author;
	};

	Books.prototype.getBook = function() {
		return this.book;
	};

	Books.prototype.remove = function (cb, errorcb) {
		return Books.remove({id:this._id.$oid}, cb, errorcb);
	};

	Books.prototype['delete'] = function (cb, errorcb) {
		return this.remove(cb, errorcb);
	};

	return Books;
});

